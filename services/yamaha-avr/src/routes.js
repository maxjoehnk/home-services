const logger = require('./logger');

function powerOff(avr) {
    return async function(req, res, next) {
        logger.debug('Turning off AVR');
        try {
            await avr.powerOff();
        }catch (err) {
            return next(err);
        }
        res.send(204);
    };
}

function powerOn(avr) {
    return async function(req, res, next) {
        logger.debug('Turning on AVR');
        try {
            await avr.powerOn();
        }catch (err) {
            return next(err);
        }
        res.send(204);
    };
}

function powerToggle(avr) {
    return async function(req, res, next) {
        let power;
        try {
            power = await avr.isOn();
        }catch (err) {
            return next(err);
        }
        logger.debug(`Turning ${power ? 'off' : 'on'} AVR`);
        try {
            await power ? avr.powerOff() : avr.powerOn();
        }catch (err) {
            return next(err);
        }
        res.send(204);
    };
}

function mute(avr) {
    return async function(req, res, next) {
        logger.debug('Muting AVR');
        try {
            await avr.muteOn();
        }catch (err) {
            return next(err);
        }
        res.send(204);
    };
}

function unmute(avr) {
    return async function(req, res, next) {
        logger.debug('Unmuting AVR');
        try {
            await avr.muteOff();
        }catch (err) {
            return next(err);
        }
        res.send(204);
    };
}

function getVolume(avr) {
    return async function(req, res, next) {
        logger.debug('Requesting Volume');
        try {
            const { getVolume } = await avr.getBasicInfo();
            res.send(200, getVolume());
        }catch (err) {
            return next(err);
        }
    };
}

function setVolume(avr) {
    return async function(req, res, next) {
        logger.debug(`Setting Volume to ${req.params.value}`);
        try {
            await avr.setVolumeTo(req.params.value);
        }catch (err) {
            return next(err);
        }
        res.send(204);
    };
}

function getBasicInfo(avr) {
    return async function(req, res, next) {
        logger.debug('Requesting Basic Info');
        try {
            const info = await avr.getBasicInfo();
            res.send(200, info);
        }catch (err) {
            return next(err);
        }
    };
}

module.exports = {
    powerOff,
    powerOn,
    powerToggle,
    mute,
    unmute,
    getVolume,
    setVolume,
    getBasicInfo
};
