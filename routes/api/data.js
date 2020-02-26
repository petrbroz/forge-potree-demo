const express = require('express');
const { DataManagementClient, urnify } = require('forge-server-utils');
const config = require('../../config');

let dataManagementClient = new DataManagementClient({ client_id: config.forge.client_id, client_secret: config.forge.client_secret });
let router = express.Router();

// GET /api/data/models
// Lists URNs and names of all available Forge models, grouped by their buckets
router.get('/models', async function (req, res) {
    try {
        let results = {};
        let subtasks = [];
        const buckets = await dataManagementClient.listBuckets();
        for (const bucket of buckets) {
            results[bucket.bucketKey] = [];
            subtasks.push(dataManagementClient.listObjects(bucket.bucketKey).then(objects => {
                for (const obj of objects) {
                    results[obj.bucketKey].push({
                        name: obj.objectKey,
                        urn: urnify(obj.objectId)
                    });
                }
            }));
        }
        await Promise.all(subtasks);
        res.json(results);
    } catch (err) {
        console.error(err);
        res.status(400).send(err);
    }
});

module.exports = router;
