const { createServer, plugins } = require('restify');
const setupRoutes = require('./routes');
const setupAssociations = require('./associations');
const admin = require('firebase-admin');
const logger = require('./logger');
const {
    loadConfig,
    defaultOptions
} = require('./config');

async function start(args) {
    try {
        const options = defaultOptions(args);
        logger.level(options.logLevel);
        const config = await loadConfig(options.config);
        admin.initializeApp({
            credential: admin.credential.cert(config.firebase.account),
            databaseURL: config.firebase.url
        });
        const server = createServer({
            log: logger
        });
        server.use(plugins.bodyParser());
        server.use(plugins.requestLogger());
        server.use(plugins.queryParser());
        setupAssociations(config.associations);
        setupRoutes(server, config);
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
