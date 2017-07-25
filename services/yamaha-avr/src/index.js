const fs = require('fs');
const { resolve } = require('path');
const { promisify } = require('util');
const { safeLoad } = require('js-yaml');
const YamahaAPI = require('yamaha-nodejs');
const { createServer } = require('restify');
const logger = require('./logger');
const routes = require('./routes');

const readFile = promisify(fs.readFile);

async function start(args) {
    try {
        const options = defaultOptions(args);
        logger.level(options.logLevel);
        const config = await loadConfig(options.config);
        const avr = new YamahaAPI(config.ip);
        const server = createServer();
        setupServer(server, avr);
        server.listen(config.port, () => {
            logger.info(`Listening on Port ${config.port}`);
        });
    }catch (err) {
        logger.fatal(err);
    }
}

function setupServer(server, avr) {
    server.get('/', routes.getBasicInfo(avr));
    server.get('/power/off', routes.powerOff(avr));
    server.get('/power/on', routes.powerOn(avr));
    server.get('/power/toggle', routes.powerToggle(avr));
    server.get('/volume/mute', routes.mute(avr));
    server.get('/volume/unmute', routes.unmute(avr));
    server.get('/volume', routes.getVolume(avr));
    server.get('/volume/:value', routes.setVolume(avr));
}

function defaultOptions(options) {
    const defaults = {
        config: resolve(__dirname, '../config.yml'),
        logLevel: 'warn'
    };
    return Object.assign({}, defaults, options);
}

function defaultConfig(config) {
    const defaults = {
        port: 8080
    };
    return Object.assign({}, defaults, config);
}

async function loadConfig(path) {
    const file = await readFile(path, 'utf8');
    const config = safeLoad(file); //TODO: Validate result
    return defaultConfig(config);
}

module.exports = {
    start
};
