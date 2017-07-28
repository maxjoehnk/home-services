const { createLogger } = require('bunyan');
const formatter = require('bunyan-format');

const logger = createLogger({
    name: 'cast-service',
    stream: formatter({
        outputMode: 'short'
    })
});

module.exports = logger;
