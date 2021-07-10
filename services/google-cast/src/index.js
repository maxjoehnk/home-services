const { createServer, plugins } = require('restify');
const { Server, OPEN } = require('ws');
const setupRoutes = require('./routes');
const setupCast = require('./cast');
const createStore = require('./store');
const { eventSetup } = require('./store/actions');
const logger = require('./logger');
const { defaultOptions, loadConfig } = require('./config');

async function start(args) {
    try {
        const options = defaultOptions(args);
        logger.level(options.logLevel);
        const config = await loadConfig(options.config);
        const store = createStore(options);
        store.dispatch(eventSetup(config));
        setupCast(store);
        const server = createServer({
            log: logger
        });
        const wss = new Server({ server: server.server });
        wss.on('connection', (ws, req) => logger.debug({ req }));
        store.subscribe(() => {
            wss.clients.forEach(client => {
                if (client.readyState === OPEN) {
                    client.send('UPDATE');
                }
            });
        });
        server.use(plugins.requestLogger());
        server.use(plugins.queryParser());
        setupRoutes(server, store);
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
