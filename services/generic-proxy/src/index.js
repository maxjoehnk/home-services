// @flow

const fs = require('fs');
const { resolve } = require('path');
// $FlowFixMe
const { promisify } = require('util');
const { safeLoad } = require('js-yaml');
const logger = require('./logger');

const readFile = promisify(fs.readFile);

/*::
type Route = {
    url: string
};

type Routes = {
    [string]: Route
};

type Config = {
    port: number,
    routes: Routes
};

type LogLevel = 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'fatal';

type Options = {
    config: string,
    logLevel: LogLevel
};
*/

async function start(args /* :any */) {
    try {
        const options = defaultOptions(args);
        logger.level(options.logLevel);
        const config = await loadConfig(options.config);
        setupRoutes(config.routes);
    }catch (err) {
        logger.fatal(err);
    }
}

function setupRoutes(routes /* :Routes */) /* :void */ {

}

function defaultOptions(options /* :Options */) /* :Options*/ {
    const defaults = {
        config: resolve(__dirname, '../config.yml'),
        logLevel: 'warn'
    };
    return Object.assign({}, defaults, options);
}

function defaultConfig(config /* :Config */) /* :Config */ {
    const defaults = {
        port: 8080,
        routes: {}
    };
    return Object.assign({}, defaults, config);
}

async function loadConfig(path /* :string */) /* :Promise<Config> */ {
    const file = await readFile(path, 'utf8');
    const config = safeLoad(file); //TODO: Validate result
    return defaultConfig(config);
}

module.exports = {
    start
};
