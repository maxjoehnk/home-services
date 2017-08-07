const fs = require('fs');
const { resolve } = require('path');
const { promisify } = require('util');
const { safeLoad } = require('js-yaml');
const { createServer } = require('restify');
const logger = require('./logger');
const routes = require('./routes');
const store = require('./store');
const { loadScenes } = require('./store/actions/scenes');

const readFile = promisify(fs.readFile);

async function start(args) {
    try {
        const options = defaultOptions(args);
        logger.level(options.logLevel);
        const config = await loadConfig(options.config);
        store.dispatch(loadScenes(config.scenes));
        const server = createServer();
        setupServer(server);
        server.listen(config.port, () => {
            logger.info(`Listening on Port ${config.port}`);
        });
    }catch (err) {
        logger.fatal(err);
    }
}

function setupServer(server) {
    server.get('/scenes', routes.getAllScenes);
    server.get('/scenes/:scene/active', routes.isSceneActive);
    server.get('/scenes/:scene/activate', routes.activateScene);
    server.get('/scenes/:scene/deactivate', routes.deactivateScene);
    server.get('/scenes/:scene/enabled', routes.isEnabled);
    server.get('/scenes/:scene/enable', routes.enableScene);
    server.get('/scenes/:scene/disable', routes.disableScene);
    server.get('/scenes/:scene/states', routes.getStates);
    server.get('/scenes/:scene/states/:state/activate', routes.activateState);
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
