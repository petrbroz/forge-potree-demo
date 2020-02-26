const path = require('path');
const express = require('express');
const config = require('./config');

let app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/data', require('./routes/api/data'));
app.listen(config.port, () => { console.log(`Server listening on port ${config.port}...`); });
