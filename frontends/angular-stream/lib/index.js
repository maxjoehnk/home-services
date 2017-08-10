const express = require('express');
const { Server, OPEN } = require('ws');
const { createServer } = require('http');
const api = require('./api');
const logger = require('./logger');
const stream = require('./stream');
const { stream: stub } = require('./stubs');

const { loadConfig, defaultOptions } = require('./config');

async function setup() {
    const options = defaultOptions();
    const config = await loadConfig(options.config);
    const { fetchStream } = stream(config);
    const app = express();
    app.use('/_api', api(config));
    const server = createServer(app);
    const wss = new Server({ server });
    wss.on('connection', (ws, req) => {
        logger.debug({ req });
        const interval = setInterval(async() => {
            const stream = await fetchStream();
            if (ws.readyState === OPEN) {
                ws.send(JSON.stringify([...stream, ...stub]));
            }
        }, 1000);
        ws.on('close', () => {
            clearInterval(interval);
        });
    });
    server.listen(8080, () => logger.info('listening', 8080));
}

logger.level('debug');

setup()
    .catch(err => logger.error(err));
