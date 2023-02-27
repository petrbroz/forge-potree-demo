const express = require('express');
const { DataManagementClient, urnify } = require('forge-server-utils');
const config = require('../../config.js');

let dataManagementClient = new DataManagementClient({ client_id: config.client_id, client_secret: config.client_secret });
let router = express.Router();

// GET /api/data/models
// Lists URNs and names of all available Forge models, grouped by their buckets
router.get('/models', async function (req, res, next) {
    try {
        const objects = await dataManagementClient.listObjects(config.bucket);
        res.json(objects.map(obj => ({
            name: obj.objectKey,
            urn: urnify(obj.objectId)
        })));
    } catch (err) {
        next(err);
    }
});

module.exports = router;