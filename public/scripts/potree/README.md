# PotreeExtension

> Forge Viewer extension for loading and rendering Potree models.

The extension uses [potree-core](https://github.com/tentone/potree-core) library that
has been back-ported to three.js version 71 (the one used by the Forge Viewer).
The experimental back-ported version of the library can be found in
https://github.com/petrbroz/potree-core/tree/experiment/three71.

Apart from the library itself (available as either _potree.js_, _potree.min.js_, or _potree.module.js_),
this folder also includes various decoders in the _workers_ subfolder, and a sample dataset
from https://github.com/tentone/potree-core.

## Usage

- copy this folder to your Forge application (the _data_ subfolder is not necessary)
- include the Potree library and the extension in your HTML, after the Forge Viewer script:

```html
<script src="https://developer.api.autodesk.com/modelderivative/v2/viewers/7.*/viewer3D.min.js"></script>
<script src="/<path to potree folder>/potree.js"></script>
<script src="/<path to potree folder>/PotreeExtension.js"></script>
```

- in your JavaScript code, use the extension's `loadPointCloud` method, for example:

```js
const potreeExtension = viewer.getExtension('PotreeExtension');
let name = `Pointcloud from ${url}`;
let position = new THREE.Vector3(0, 0, -25);
let scale = new THREE.Vector3(5, 5, 5);
const pointcloud = await potreeExtension.loadPointCloud(name, url, position, scale);
const bbox = pointcloud.boundingBox.clone().expandByVector(scale);
viewer.navigation.fitBounds(false, bbox);
```
