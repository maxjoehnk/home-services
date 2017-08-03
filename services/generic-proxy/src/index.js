// @flow
const Koa = require('koa');
const logger = require('./logger');
const { defaultOptions, loadConfig } = require('./config');
const { setupRoutes } = require('./routes');

async function start(args /* :any */) {
    try {
        const options = defaultOptions(args);
        logger.level(options.logLevel);
        const config = await loadConfig(options.config);
        const server = new Koa();
        server.use(setupRoutes(config.routes));
        server.on('error', (err) => {
            logger.error(err);
        });
        server.on('listening', () => {
            logger.info(`Listening on Port ${config.port}`);
        });
        server.listen(config.port);
    }catch (err) {
        logger.fatal(err);
    }
}

module.exports = {
    start
};
