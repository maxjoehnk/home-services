const { createServer, plugins } = require('restify');
const logger = require('./logger');
const { defaultOptions, loadConfig } = require('./config');
const { configLoad } = require('./store/actions/config');
const createStore = require('./store');
const connectRoutes = require('./routes');

async function start(args) {
    try {
        const options = defaultOptions(args);
        logger.level(options.logLevel);
        const config = await loadConfig(options.config);
        const store = createStore(options);
        store.dispatch(configLoad(config));
        const server = createServer({
            log: logger
        });
        server.use(plugins.requestLogger());
        server.use(plugins.queryParser());
        connectRoutes(server, store);
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
