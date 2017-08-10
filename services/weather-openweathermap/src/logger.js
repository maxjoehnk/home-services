const { createLogger, stdSerializers } = require('bunyan');
const formatter = require('bunyan-format');

const logger = createLogger({
    name: 'openweathermap-service',
    stream: formatter({
        outputMode: 'short'
    }),
    serializers: stdSerializers
});

module.exports = logger;
