const logger = require('./logger');

function getLights(api) {
    return async function(req, res) {
        const { lights } = await api.lights();
        logger.trace(lights);
        res.send(200, lights);
    };
}

function getLight(api) {
    return async function(req, res) {
        const light = await api.lightStatus(req.params.id);
        logger.trace(light);
        res.send(200, light);
    };
}

function setPowerAll(api, power) {
    return async function(req, res) {
        logger.debug('Turning off all Lights');
        const { lights } = await api.lights();
        const promises = lights.map(({ id }) => api.setLightState(id, {
            on: power
        }));
        const result = await Promise.all(promises);
        logger.trace(result);
        res.send(204);
    };
}

function setPower(api, power) {
    return async function(req, res) {
        logger.debug(`Turning off Light ${req.params.id}`);
        const result = await api.setLightState(req.params.id, {
            on: power
        });
        logger.trace(result);
        res.send(204);
    };
}

function togglePower(api) {
    return async function(req, res) {
        logger.debug(`Toggling Light ${req.params.id}`);
        const { state } = await api.lightStatus(req.params.id);
        let power;
        if (state.on) {
            power = false;
        }else {
            power = true;
        }
        const result = await api.setLightState(req.params.id, {
            on: power
        });
        logger.trace(result);
        res.send(204);
    };
}

function setBrightnessAll(api) {
    return async function(req, res) {
        logger.debug(`Setting all Lights to ${req.params.value} brightness`);
        const { lights } = await api.lights();
        const promises = lights.map(({ id }) => api.setLightState(id, {
            bri: req.params.value
        }));
        const result = await Promise.all(promises);
        logger.trace(result);
        res.send(204);
    };
}

function setBrightness(api) {
    return async function(req, res) {
        logger.debug(`Setting Light ${req.params.id} to ${req.params.value} brightness`);
        const result = await api.setLightState(req.params.id, {
            bri: req.params.value
        });
        logger.trace(result);
        res.send(204);
    };
}

function getGroups(api) {
    return async function(req, res) {
        const groups = await api.groups();
        logger.trace(groups);
        res.send(200, groups);
    };
}

function getGroup(api) {
    return async function(req, res) {
        logger.debug(`Getting Group ${req.params.id}`);
        const group = await api.getGroup(req.params.id);
        logger.trace(group);
        res.send(200, group);
    };
}

module.exports = {
    getLights,
    getLight,
    setPower,
    setPowerAll,
    togglePower,
    setBrightness,
    setBrightnessAll,
    getGroups,
    getGroup
};
