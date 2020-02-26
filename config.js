const { FORGE_CLIENT_ID, FORGE_CLIENT_SECRET, PORT } = process.env;

if (!FORGE_CLIENT_ID || !FORGE_CLIENT_SECRET) {
    console.warn('Some of the following environment variables are missing:');
    console.warn('FORGE_CLIENT_ID, FORGE_CLIENT_SECRET');
    process.exit(1);
}

module.exports = {
    port: parseInt(PORT) || 3000,
    forge: {
        client_id: FORGE_CLIENT_ID,
        client_secret: FORGE_CLIENT_SECRET
    }
};
