const express = require('express');
const api = require('./api');

const { loadConfig, defaultOptions } = require('./config');

async function setup() {
    const options = defaultOptions();
    const config = await loadConfig(options.config);
    const app = express();

    app.use('/_api', api(config));
    app.listen(8080, () => console.log('listening'));
}

setup()
    .catch(err => console.error(err));
