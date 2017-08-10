const { createLogger, stdSerializers } = require('bunyan');
const formatter = require('bunyan-format');

const logger = createLogger({
    name: 'angular-stream-server',
    stream: formatter({
        outputMode: 'short'
    }),
    serializers: stdSerializers
});

module.exports = logger;
