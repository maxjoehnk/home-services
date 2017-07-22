const fs = require('fs');
const { resolve } = require('path');
const { promisify } = require('util');
const { safeLoad } = require('js-yaml');
const DashButton = require('node-dash-button')
const { createLogger } = require('bunyan');
const fetch = require('node-fetch');

const readFile = promisify(fs.readFile);

const logger = createLogger({
    name: 'amazon-dash-button-service'
});

async function start(args) {
    try {
        const options = defaultOptions(args);
        logger.level(options.logLevel);
        const config = await loadConfig(options.config);
        config.buttons.forEach(({ address, urls }) => {
            const button = DashButton(address, null, null, 'all');
            button.on('detected', () => {
                logger.debug(`Button ${address} pressed`);
                urls.forEach(url => {
                    logger.debug(`Fetching ${url}`);
                    fetch(url)
                        .then(res => logger.debug(`GET: ${url} - ${res.status} ${res.statusText}`))
                        .catch(err => logger.error(err));
                });
            });
        });
    }catch (err) {
        logger.fatal(err);
    }
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
        buttons: []
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
