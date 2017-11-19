const { database } = require('firebase-admin');
const logger = require('./logger');
const fetch = require('node-fetch');

function setupAssociations(associations) {
    const db = database();
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
                        .catch(err => console.error(err));
                });
            });
    });
}

module.exports = setupAssociations;
