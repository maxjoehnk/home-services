const fs = require('fs');
const { resolve } = require('path');
const { promisify } = require('util');
const { safeLoad } = require('js-yaml');
const { createServer, plugins } = require('restify');
const { createLogger } = require('bunyan');
const { HueApi, nupnpSearch, upnpSearch } = require('node-hue-api');
const sleep = require('sleep-promise');

const readFile = promisify(fs.readFile);

const logger = createLogger({
    name: 'philips-hue-service'
});

async function start(args) {
    try {
        const options = defaultOptions(args);
        logger.level(options.logLevel);
        const config = await loadConfig(options.config);
        const server = createServer();
        setupServer(server, config);
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
        }catch (err) {}
        await sleep(2000); // Don't hammer the api
        i--;
        if (i < 0) {
            console.log('Aborting');
            return;
        }
    }
}

function setupServer(server, config) {
    
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
