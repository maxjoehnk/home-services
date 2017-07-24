const { createLogger } = require('bunyan');

const logger = createLogger({
    name: 'philips-hue-service'
});

module.exports = logger;
