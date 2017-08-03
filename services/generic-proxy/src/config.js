// @flow
/*:: import { type Options, type Config } from './types';*/
const fs = require('fs');
const { resolve } = require('path');
// $FlowFixMe
const { promisify } = require('util');
const { safeLoad } = require('js-yaml');

const readFile = promisify(fs.readFile);

function defaultOptions(options /* :Options */) /* :Options*/ {
    const defaults /* :Options */ = {
        config: resolve(__dirname, '../config.yml'),
        logLevel: 'warn'
    };
    return Object.assign({}, defaults, options);
}

function defaultConfig(config /* :Config */) /* :Config */ {
    const defaults /* :Config */ = {
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
    defaultOptions,
    defaultConfig,
    loadConfig
};
