const { APS_CLIENT_ID, APS_CLIENT_SECRET, APS_BUCKET, PORT } = process.env;

if (!APS_CLIENT_ID || !APS_CLIENT_SECRET || !APS_BUCKET) {
    console.warn('Some of the following environment variables are missing:');
    console.warn('APS_CLIENT_ID, APS_CLIENT_SECRET, APS_BUCKET');
    process.exit(1);
}

module.exports = {
    port: parseInt(PORT) || 3000,
    client_id: APS_CLIENT_ID,
    client_secret: APS_CLIENT_SECRET,
    bucket: APS_BUCKET
};