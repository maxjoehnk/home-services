const logger = require('./logger');

function getLights(api) {
    return async function(req, res, next) {
        try {
            const { lights } = await api.lights();
            logger.trace(lights);
            res.send(200, lights);
        }catch (err) {
            next(err);
        }
    };
}

function getLight(api) {
    return async function(req, res, next) {
        try {
            const light = await api.lightStatus(req.params.id);
            logger.trace(light);
            res.send(200, light);
        }catch (err) {
            next(err);
        }
    };
}

function setPowerAll(api, power) {
    return async function(req, res, next) {
        logger.debug('Turning off all Lights');
        try {
            const { lights } = await api.lights();
            const promises = lights.map(({ id }) => api.setLightState(id, {
                on: power
            }));
            const result = await Promise.all(promises);
            logger.trace(result);
            res.send(204);
        }catch (err) {
            next(err);
        }
    };
}

function setPower(api, power) {
    return async function(req, res, next) {
        logger.debug(`Turning ${power ? 'on' : 'off'} Light ${req.params.id}`);
        try {
            const result = await api.setLightState(req.params.id, {
                on: power
            });
            logger.trace(result);
            res.send(204);
        }catch (err) {
            next(err);
        }
    };
}

function setPowerGroup(api, power) {
    return async function(req, res, next) {
        logger.debug(`Turning ${power ? 'on' : 'off'} Light Group ${req.params.id}`);
        try {
            const result = await api.setGroupLightState(req.params.id, {
                on: power
            });
            logger.trace(result);
            res.send(204);
        }catch (err) {
            next(err);
        }
    };
}

function togglePower(api) {
    return async function(req, res, next) {
        logger.debug(`Toggling Light ${req.params.id}`);
        try {
            const { state } = await api.lightStatus(req.params.id);
            const result = await api.setLightState(req.params.id, {
                on: !state.on
            });
            logger.trace(result);
            res.send(204);
        }catch (err) {
            next(err);
        }
    };
}

function togglePowerGroup(api) {
    return async function(req, res, next) {
        logger.debug(`Toggling Light Group ${req.params.id}`);
        try {
            const { lastAction } = await api.getGroup(req.params.id);
            const result = await api.setGroupLightState(req.params.id, {
                on: !lastAction.on
            });
            logger.trace(result);
            res.send(204);
        }catch (err) {
            next(err);
        }
    };
}

function setBrightnessAll(api) {
    return async function(req, res, next) {
        logger.debug(`Setting all Lights to ${req.params.value} brightness`);
        try {
            const { lights } = await api.lights();
            const promises = lights.map(({ id }) => api.setLightState(id, {
                bri: req.params.value
            }));
            const result = await Promise.all(promises);
            logger.trace(result);
            res.send(204);
        }catch (err) {
            next(err);
        }
    };
}

function setBrightness(api) {
    return async function(req, res, next) {
        logger.debug(`Setting Light ${req.params.id} to ${req.params.value} brightness`);
        try {
            const result = await api.setLightState(req.params.id, {
                bri: req.params.value
            });
            logger.trace(result);
            res.send(204);
        }catch (err) {
            next(err);
        }
    };
}

function setBrightnessGroup(api) {
    return async function(req, res, next) {
        logger.debug(`Setting Group ${req.params.id} to ${req.params.value} brightness`);
        try {
            const result = await api.setGroupLightState(req.params.id, {
                bri: req.params.value
            });
            logger.trace(result);
            res.send(204);
        }catch (err) {
            next(err);
        }
    };
}

function getBrightnessGroup(api) {
    return async function(req, res, next) {
        logger.debug(`Getting Group ${req.params.id} brightness`);
        try {
            const { lastAction } = await api.getGroup(req.params.id);
            res.json(200, { brightness: lastAction.bri });
        }catch (err) {
            next(err);
        }
    };
}

function getGroups(api) {
    return async function(req, res, next) {
        try {
            const groups = await api.groups();
            logger.trace(groups);
            res.send(200, groups);
        }catch (err) {
            next(err);
        }
    };
}

function getGroup(api) {
    return async function(req, res, next) {
        logger.debug(`Getting Group ${req.params.id}`);
        try {
            const group = await api.getGroup(req.params.id);
            logger.trace(group);
            res.send(200, group);
        }catch (err) {
            next(err);
        }
    };
}

module.exports = {
    getLights,
    getLight,
    setPower,
    setPowerAll,
    setPowerGroup,
    togglePower,
    togglePowerGroup,
    setBrightness,
    setBrightnessAll,
    setBrightnessGroup,
    getBrightnessGroup,
    getGroups,
    getGroup
};
