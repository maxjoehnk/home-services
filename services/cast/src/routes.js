const logger = require('./logger');
const cast = require('./cast');

function getServices(services) {
    return function(req, res) {
        res.send(200, services);
    };
}

function getStatus(services) {
    return async function(req, res, next) {
        const names = Object.getOwnPropertyNames(services);
        const devices = {};
        for (let i = 0; i < names.length; i++) {
            const name = names[i];
            logger.debug(`Fetching Status of ${name}`);
            const service = services[name];
            try {
                const client = await cast.connect(service);
                const status = await cast.getStatus(client);
                devices[name] = status;
            }catch (err) {
                return next(err);
            }
        }
        res.send(200, devices);
    };
}

function getSessions(services) {
    return async function(req, res, next) {
        const names = Object.getOwnPropertyNames(services);
        const devices = {};
        for (let i = 0; i < names.length; i++) {
            const name = names[i];
            logger.debug(`Fetching Sessions of ${name}`);
            const service = services[name];
            try {
                const client = await cast.connect(service);
                const sessions = await cast.getSessions(client);
                devices[name] = sessions;
            }catch (err) {
                return next(err);
            }
        }
        res.send(200, devices);
    };
}

module.exports = {
    getServices,
    getStatus,
    getSessions
};
