const { Client } = require('castv2-client');
const { DefaultMediaReceiver } = require('castv2-client');
const logger = require('./logger');
const execute = require('../../../shared/url-executor');

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

async function setup(service, config) {
    const client = await connect(service);
    let lastAppStatus;
    let lastStatus;
    let interval;
    const handleStatusUpdate = status => {
        logger.trace(status, 'Device Status');
        if (lastStatus && status.volume.level !== lastStatus.volume.level) {
            emit(config.events, 'volume');
        }
        if (lastStatus && status.volume.muted !== lastStatus.volume.muted) {
            emit(config.events, status.volume.muted ? 'mute' : 'unmute');
        }
        if (status.applications && status.applications.length > 0) {
            if (!lastStatus || !lastStatus.applications || lastStatus.applications !== status.applications) {
                //!app && app.close();
                // TODO: test for media capability
                client.join(status.applications[0], DefaultMediaReceiver, (err, app) => {
                    if (err) {
                        console.error(err);
                        return;
                    }
                    app.getStatus((err, appStatus) => {
                        if (err) {
                            return logger.error(err);
                        }
                        appStatus && handleAppStatusUpdate(appStatus);
                    });
                    interval = setInterval(() => {
                        app.getStatus((err, appStatus) => {
                            if (err) {
                                return logger.error(err);
                            }
                            appStatus && handleAppStatusUpdate(appStatus);
                        });
                    }, 1000);
                    app.on('status', appStatus => handleAppStatusUpdate(appStatus));
                    logger.trace(app, 'Running Application');
                });
            }
        }else {
            if (interval) {
                clearInterval(interval);
            }
        }
        lastStatus = status;
    };
    const handleAppStatusUpdate = status => {
        logger.trace(status, 'App Status');
        if (lastAppStatus && lastAppStatus.playerState !== status.playerState) {
            switch (status.playerState) { // BUFFERING, IDLE
                case 'PAUSED':
                    emit(config.events, 'pause', lastStatus.applications[0]);
                    break;
                case 'PLAYING':
                    emit(config.events, 'play', lastStatus.applications[0]);
                    break;
            }
        }
        lastAppStatus = status;
    };
    client.getStatus((err, status) => {
        if (err) {
            logger.error(err);
            return;
        }
        handleStatusUpdate(status);
    });
    client.on('status', status => handleStatusUpdate(status));
}

async function emit(events, name, application) {
    logger.debug(`Executing Urls for event ${name}`);
    if (events[name]) {
        let urls;
        if (events[name] instanceof Array) {
            urls = events[name];
        }else {
            urls = events[name].urls;
            const filter = events[name].filter;
            if (filter && application && application.displayName) {
                if (!filter.includes(application.displayName)) {
                    logger.debug(`Skipping Event Execution for App ${application.displayName}`);
                    return;
                }
            }
        }
        await execute(urls);
    }
}

module.exports = {
    connect,
    getStatus,
    getSessions,
    setup
};
