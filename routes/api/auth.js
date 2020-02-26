const express = require('express');
const { AuthenticationClient } = require('forge-server-utils');
const config = require('../../config');

let authenticationClient = new AuthenticationClient(config.forge.client_id, config.forge.client_secret);
let router = express.Router();

// GET /api/auth/token
// Generate access token for the viewer
router.get('/token', async function (req, res) {
    try {
        const token = await authenticationClient.authenticate(['viewables:read']);
        res.json(token);
    } catch (err) {
        console.error(err);
        res.status(400).send(err);
    }
});

module.exports = router;
