const express = require('express');
const { Server, OPEN } = require('ws');
const { createServer } = require('http');
const api = require('./api');
const logger = require('./logger');
const providers = require('./providers');
const stream = require('./stream');

const { loadConfig, defaultOptions } = require('./config');

async function setup() {
    const options = defaultOptions();
    const config = await loadConfig(options.config);
    const { subscribe } = providers(config);
    const { fetchStream } = stream(config);
    const app = express();
    app.use(express.static(options.dist));
    app.use('/_api', api(config));
    const server = createServer(app);
    const wss = new Server({ server });
    wss.broadcast = function broadcast(data) {
        wss.clients.forEach(function each(client) {
            if (client.readyState === OPEN) {
                client.send(data);
            }
        });
    };
    wss.on('connection', (ws, req) => logger.debug({ req }));
    subscribe(config.providers, async() => {
        logger.debug('Received Update from Provider');
        const stream = await fetchStream();
        wss.broadcast(JSON.stringify(stream));
    });
    server.listen(config.port, () => logger.info('listening', config.port));
}

logger.level('debug');

setup()
    .catch(err => logger.error(err));
