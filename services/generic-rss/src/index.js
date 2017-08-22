const { createServer, plugins } = require('restify');
const logger = require('./logger');
const { defaultOptions, loadConfig } = require('./config');
const { configFeedLoad } = require('./store/actions/config');
const createStore = require('./store');

async function start(args) {
    try {
        const options = defaultOptions(args);
        logger.level(options.logLevel);
        const config = await loadConfig(options.config);
        const store = createStore(options);
        store.dispatch(configFeedLoad(config));
        const server = createServer({
            log: logger
        });
        server.use(plugins.requestLogger());
        server.use(plugins.queryParser());
        server.listen(config.port, () => {
            logger.info(`Listening on Port ${config.port}`);
        });
    }catch (err) {
        logger.fatal(err);
    }
}

module.exports = {
    start
};
