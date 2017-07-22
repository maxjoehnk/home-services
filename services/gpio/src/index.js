const fs = require('fs');
const { resolve } = require('path');
const { promisify } = require('util');
const { safeLoad } = require('js-yaml');
const wpi = require('wiring-pi');
const { createServer, plugins } = require('restify');
const { createLogger } = require('bunyan');

const readFile = promisify(fs.readFile);

const logger = createLogger({
    name: 'gpio-service'
});

async function start(args) {
    try {
        const options = defaultOptions(args);
        logger.level(options.logLevel);
        const config = await loadConfig(options.config);
        setupInterrupts(config);
        const outputs = setupOutputs(config);
        const server = createServer();
        setupServer(server, config, outputs);
        server.listen(config.port, () => {
            logger.info(`Listening on Port ${config.port}`);
        });
    }catch (err) {
        logger.fatal(err);
    }
}

function setupInterrupts({ interrupts }) {

}

function setupOutputs(config) {
    const outputs = {};
    config.outputs.forEach(outputConfig => {
        const output = {};
        switch (outputConfig.mode) {
            case 'rgb':
                break;
            case 'digital':
                break;
            case 'pwm':
                break;
        }
        outputs[outputConfig.name] = output;
    });
    return outputs;
}

function setupServer(server, { endpoints }, outputs) {
    endpoints.forEach(endpoint => {
        server.get(endpoint.url, (req, res, next) => {
        });
    });
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
        numbering: 'wpi',
        interrupts: [],
        endpoints: [],
        outputs: []
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
