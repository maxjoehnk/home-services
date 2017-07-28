const fs = require('fs');
const { resolve } = require('path');
const { promisify } = require('util');
const { safeLoad } = require('js-yaml');
const { createServer } = require('restify');
const mdns = require('mdns');
const logger = require('./logger');
const routes = require('./routes');
const cast = require('./cast');

const readFile = promisify(fs.readFile);

async function start(args) {
    try {
        const options = defaultOptions(args);
        logger.level(options.logLevel);
        const config = await loadConfig(options.config);
        const browser = mdns.createBrowser(mdns.tcp('googlecast'));
        const services = {};
        browser.on('serviceUp', async service => {
            const name = service.txtRecord.fn;
            logger.debug(`Found ${name}`, service);
            if (config.devices[name]) {
                cast.setup(service, config.devices[name]);
            }
            services[service.name] = service;
        });
        browser.on('serviceDown', service => {
            delete services[service.name];
        });
        browser.start();
        const server = createServer();
        setupServer(server, services);
        server.listen(config.port, () => {
            logger.info(`Listening on Port ${config.port}`);
        });
    }catch (err) {
        logger.fatal(err);
    }
}

function setupServer(server, services) {
    server.get('/devices', routes.getServices(services));
    server.get('/status', routes.getStatus(services));
    server.get('/sessions', routes.getSessions(services));
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
        port: 8080,
        devices: {}
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
