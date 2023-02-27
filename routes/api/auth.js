const express = require('express');
const { AuthenticationClient } = require('forge-server-utils');
const config = require('../../config.js');

let authenticationClient = new AuthenticationClient(config.client_id, config.client_secret);
let router = express.Router();

// GET /api/auth/token
// Generate access token for the viewer
router.get('/token', async function (req, res, next) {
    try {
        const token = await authenticationClient.authenticate(['viewables:read']);
        res.json(token);
    } catch (err) {
        next(err);
    }
});

module.exports = router;