const { Client } = require('castv2-client');

function connect(service) {
    const client = new Client();
    return new Promise((resolve, reject) => {
        client.connect(service.addresses[0], () => {
            resolve(client);
        });

        client.on('error', err => {
            reject(err);
        });
    });
}

function getStatus(client) {
    return new Promise((resolve, reject) => {
        client.getStatus((err, status) => {
            if (err) {
                return reject(err);
            }
            return resolve(status);
        });
    });
}

function getSessions(client) {
    return new Promise((resolve, reject) => {
        client.getSessions((err, sessions) => {
            if (err) {
                return reject(err);
            }
            return resolve(sessions);
        });
    });
}

module.exports = {
    connect,
    getStatus,
    getSessions
};
