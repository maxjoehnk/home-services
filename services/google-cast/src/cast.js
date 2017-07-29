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
    let currentApp;
    const handleStatusUpdate = status => {
        logger.trace(status, 'Device Status');
        if (lastStatus && status.volume.level !== lastStatus.volume.level) {
            emit(config, 'volume', currentApp);
        }
        if (lastStatus && status.volume.muted !== lastStatus.volume.muted) {
            emit(config, status.volume.muted ? 'mute' : 'unmute', currentApp);
        }
        if (status.applications && status.applications.length > 0) {
            if (!lastStatus || !lastStatus.applications || lastStatus.applications !== status.applications) {
                //!app && app.close();
                // TODO: test for media capability
                currentApp = status.applications[0];
                emit(config, 'launch', currentApp);
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
            currentApp = null;
            if (interval) {
                clearInterval(interval);
            }
        }
        lastStatus = status;
    };
    const handleAppStatusUpdate = status => {
        logger.trace(status, 'App Status');
        if (lastAppStatus && lastAppStatus.playerState !== status.playerState) {
            switch (status.playerState) {
                case 'PAUSED':
                    emit(config, 'pause', currentApp);
                    break;
                case 'PLAYING':
                    emit(config, 'play', currentApp);
                    break;
                case 'IDLE':
                    emit(config, 'idle', currentApp);
                    break;
                case 'BUFFERING':
                    emit(config, 'buffering', currentApp);
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

async function emit(handler, name, application) {
    logger.debug(`Emitting event ${name}`);
    for (let i = 0; i < handler.length; i++) {
        const { events, applications, urls } = handler[i];
        logger.trace(handler[i]);
        if (events.includes(name)) {
            if (applications && application && application.displayName) {
                if (!applications.includes(application.displayName)) {
                    logger.debug(`Skipping Event execution for App ${application.displayName}`);
                    continue;
                }
            }
            logger.debug(`Executing Urls for event ${name}`);
            try {
                await execute(urls);
            }catch (err) {
                logger.error(err);
            }
        }
    }
}

module.exports = {
    connect,
    getStatus,
    getSessions,
    setup
};
