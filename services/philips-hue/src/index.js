const fs = require('fs');
const { resolve } = require('path');
const { promisify } = require('util');
const { safeLoad } = require('js-yaml');
const { createServer } = require('restify');
const { HueApi, nupnpSearch, upnpSearch } = require('node-hue-api');
const sleep = require('sleep-promise');
const logger = require('./logger');
const routes = require('./routes');

const readFile = promisify(fs.readFile);

async function start(args) {
    try {
        const options = defaultOptions(args);
        logger.level(options.logLevel);
        const config = await loadConfig(options.config);
        const hue = new HueApi(config.bridge.ip, config.bridge.username);
        const server = createServer();
        setupServer(server, config, hue);
        server.listen(config.port, () => {
            logger.info(`Listening on Port ${config.port}`);
        });
    }catch (err) {
        logger.fatal(err);
    }
}

async function register(args) {
    const options = defaultOptions(args);
    logger.level(options.logLevel);
    let ip = options.ip;
    if (!ip) {
        logger.debug('Searching for Bridges...');
        let bridges = await nupnpSearch();
        if (bridges.length < 1) {
            logger.debug('API did not return any bridges, scanning network...');
            bridges = await upnpSearch();
        }
        if (bridges.length < 1) {
            console.log('No Bridges could be found on your Network');
            return;
        }else if (bridges.length > 1) {
            console.log('Multiple Bridges found, please select the bridge you wanna use with the ip argument');
            console.log(bridges.map(({ ipaddress }) => ipaddress).join(', '));
            return;
        }else {
            ip = bridges[0].ipaddress;
        }
    }
    console.log('Please press the Link Button on your Bridge...');
    const hue = new HueApi();
    let i = 15;
    while (true) {
        try {
            const user = await hue.registerUser(options.ip);
            console.log(`Username: ${user}`);
            return;
        }catch (err) {
            logger.trace(err);
        }
        await sleep(2000); // Don't hammer the api
        i--;
        if (i < 0) {
            console.log('Aborting');
            return;
        }
    }
}

function setupServer(server, config, api) {
    server.get('/lights', routes.getLights(api));
    server.get('/lights/:id', routes.getLight(api));
    server.get('/lights/power/off', routes.setPowerAll(api, false));
    server.get('/lights/power/on', routes.setPowerAll(api, true));
    server.get('/lights/:id/power/off', routes.setPower(api, false));
    server.get('/lights/:id/power/on', routes.setPower(api, true));
    server.get('/lights/:id/power/toggle', routes.togglePower(api));
    server.get('/lights/brightness/:value', routes.setBrightnessAll(api));
    server.get('/lights/:id/brightness/:value', routes.setBrightness(api));
    server.get('/groups', routes.getGroups(api));
    server.get('/groups/:id', routes.getGroup(api));
    server.get('/groups/:id/power/on', routes.setPowerGroup(api, true));
    server.get('/groups/:id/power/off', routes.setPowerGroup(api, false));
    server.get('/groups/:id/power/toggle', routes.togglePowerGroup(api));
    server.get('/groups/:id/brightness', routes.getBrightnessGroup(api));
    server.get('/groups/:id/brightness/:value', routes.setBrightnessGroup(api));
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
    if (!config.bridge) {
        throw new Error('No Bridge Configuration provided');
    }
    return defaultConfig(config);
}

module.exports = {
    start,
    register
};
