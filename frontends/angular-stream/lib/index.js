const express = require('express');
const api = require('./api');
const logger = require('./logger');

const { loadConfig, defaultOptions } = require('./config');

async function setup() {
    const options = defaultOptions();
    const config = await loadConfig(options.config);
    const app = express();

    app.use('/_api', api(config));
    app.listen(8080, () => logger.info('listening', 8080));
}

logger.level('debug');

setup()
    .catch(err => logger.error(err));
