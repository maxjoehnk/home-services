const { createLogger } = require('bunyan');
const formatter = require('bunyan-format');

const logger = createLogger({
    name: 'gpio-service',
    stream: formatter({
        outputMode: 'short'
    })
});

module.exports = logger;
