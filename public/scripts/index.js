$(async function () {
    const viewer = await initViewer(document.getElementById('viewer'));
    await initOverlay(viewer);
});

// Initializes the viewer
async function initViewer(container) {
    return new Promise(function (resolve, reject) {
        const options = {
            env: 'AutodeskProduction',
            getAccessToken: async function (callback) {
                const resp = await fetch('/api/auth/token');
                if (!resp.ok) {
                    throw new Error(await resp.text());
                }
                const token = await resp.json();
                callback(token.access_token, token.expires_in);
            }
        };
        Autodesk.Viewing.Initializer(options, () => {
            const config = {
                extensions: ['PotreeExtension']
            };
            const viewer = new Autodesk.Viewing.GuiViewer3D(container, config);
            viewer.start(null, null, null, null, {
                webglInitParams: {
                    useWebGL2: false
                }
            });
            resolve(viewer);
        });
    });
}

// Initializes the overlay UI
async function initOverlay(viewer) {
    const $overlay = $('#overlay');
    $overlay.append(`
        <div class="loading">
            <div class="spinner-border" class="mx-auto" role="status">
                <span class="sr-only">Loading...</span>
            </div>
        </div>
    `);

    // Setup the model dropdown
    const models = await getModels();
    $('#overlay > .loading').remove();
    const $models = $('#models');
    for (const model of models) {
        $models.append(`<option value="${model.urn}">${model.name}</option>`);
    }
    $models.on('change', function () { openModel(viewer, $models.val()); });
    $models.trigger('change');

    // Setup the point cloud input
    const $pointcloudUrl = $('#pointcloud-url');
    const $pointcloudBtn = $('#pointcloud-btn');
    $pointcloudUrl.val(window.location.href + 'scripts/potree/data/lion_takanawa/cloud.js'); // prefill with sample URL
    $pointcloudBtn.on('click', function () {
        loadPointCloud(viewer, $pointcloudUrl.val());
    });
}

// Loads list of viewable models
async function getModels() {
    const resp = await fetch('/api/data/models');
    if (!resp.ok) {
        throw new Error(await resp.text());
    }
    const models = await resp.json();
    return models;
}

// Opens viewable model
function openModel(viewer, urn) {
    function onDocumentLoadSuccess(doc) {
        viewer.loadDocumentNode(doc, doc.getRoot().getDefaultGeometry());
    }
    function onDocumentLoadFailure(code) {
        console.error(`Could not load document (code: ${code}).`);
    }
    if (urn) {
        Autodesk.Viewing.Document.load('urn:' + urn, onDocumentLoadSuccess, onDocumentLoadFailure);
    }
}

// Loads point cloud model
async function loadPointCloud(viewer, url) {
    const potreeExtension = viewer.getExtension('PotreeExtension');
    if (!potreeExtension) {
        alert('PotreeExtension not available');
        return;
    }
    let name = `Pointcloud from ${url}`;
    let position = new THREE.Vector3(0, 0, -25);
    let scale = new THREE.Vector3(5, 5, 5);
    const pointcloud = await potreeExtension.loadPointCloud(name, url, position, scale);
    const bbox = pointcloud.boundingBox.clone().expandByVector(scale);
    viewer.navigation.fitBounds(false, bbox);
}
