const { createLogger } = require('bunyan');
const formatter = require('bunyan-format');

const logger = createLogger({
    name: 'events-service',
    stream: formatter({
        outputMode: 'short'
    })
});

module.exports = logger;
