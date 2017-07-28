const fs = require('fs');
const { resolve } = require('path');
const { promisify } = require('util');
const { safeLoad } = require('js-yaml');
const execute = require('../../../shared/url-executor');
const { scheduleJob } = require('node-schedule');
const logger = require('./logger');

const readFile = promisify(fs.readFile);

async function start(args) {
    try {
        const options = defaultOptions(args);
        logger.level(options.logLevel);
        const config = await loadConfig(options.config);
        setupTimer(config);
    }catch (err) {
        logger.fatal(err);
    }
}

function setupTimer({ timers }) {
    timers.forEach(({ cron, urls }) => {
        logger.debug(`Fetching with cron format ${cron}`, urls);
        scheduleJob(cron, () =>
            execute(urls).catch(err =>
                logger.error(err)));
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
        timers: []
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
