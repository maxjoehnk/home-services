const { createServer, plugins } = require('restify');
const setupRoutes = require('./routes');
const admin = require('firebase-admin');
const fetch = require('node-fetch');
const {
    loadConfig,
    defaultOptions
} = require('./config');
const logger = require('./logger');

function setupAssociations(associations) {
    const db = admin.database();
    associations.forEach(assoc => {
        db.ref(`/associations/${assoc.name}`)
            .on('value', snapshot => {
                const { value, notify } = snapshot.val();
                if (!notify) {
                    logger.debug(`Ignoring update of /associations/${assoc.name}`);
                    return;
                }
                logger.debug(`/associations/${assoc.name} changed to ${value}`);
                assoc.urls.forEach(url => {
                    let invoke;
                    let options;
                    if (typeof url === 'string') {
                        invoke = eval(`\`${url}\``);
                        options = {};
                    }else {
                        invoke = eval(`\`${url.url}\``);
                        options = url.options;
                    }
                    fetch(invoke, options)
                        .then(() => {})
                        .catch(err => {
                            console.error(err);
                        });
                });
            });
    });
}

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
