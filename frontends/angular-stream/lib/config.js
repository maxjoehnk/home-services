const fs = require('fs');
const { resolve } = require('path');
const { promisify } = require('util');
const { safeLoad } = require('js-yaml');

const readFile = promisify(fs.readFile);

function defaultOptions(options) {
    const defaults = {
        config: resolve(__dirname, '../config.yml'),
        dist: resolve(__dirname, '../dist'),
        logLevel: 'warn'
    };
    return Object.assign({}, defaults, options);
}

function defaultConfig(config) {
    const defaults = {
        port: 8080,
        providers: [],
        stream: {
            enabled: true
        },
        presence: {
            enabled: true
        },
        scenes: {
            enabled: true
        },
        actions: {
            enabled: true
        }
    };
    return Object.assign({}, defaults, config);
}

async function loadConfig(path) {
    const file = await readFile(path, 'utf8');
    const config = safeLoad(file); //TODO: Validate result
    return defaultConfig(config);
}

module.exports = {
    defaultOptions,
    defaultConfig,
    loadConfig
};
