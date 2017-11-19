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
                const value = snapshot.val();
                logger.debug(`/associations/${assoc.name} changed to ${value}`);
                assoc.urls.forEach(url => {
                    const invoke = eval('`' + url + '`');
                    fetch(invoke)
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
        setupAssociations(config.associations);
    }catch (err) {
        logger.fatal(err);
    }
}

module.exports = {
    start
};