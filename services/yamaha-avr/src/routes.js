const wrapper = require('./api');
const { NotFoundError, InvalidArgumentError } = require('restify-errors');

module.exports = (server, avr) => {
    const api = wrapper(avr);

    const checkZone = async(req, res, next) => {
        const zones = await api.getZones();
        if (zones.includes(req.params.zone)) {
            return next();
        }
        return next(new NotFoundError('Invalid Zone'));
    };

    const checkBoolean = param => (req, res, next) => {
        const value = req.params[param];
        if (value === 'true' || value === true) {
            req.params[param] = true;
        }else if (value === 'false' || value === false) {
            req.params[param] = false;
        }else {
            return next(new InvalidArgumentError(`${value} is not of type Boolean`));
        }
        return next();
    };

    const ok = (req, res, next) => {
        res.header('Content-Type', 'application/json');
        res.sendRaw(200, JSON.stringify(req.result));
        return next();
    };

    server.get('/zones', async(req, res, next) => {
        req.result = await api.getZones();
        return next();
    }, ok);

    // Power Endpoints
    server.get('/main/power', async(req, res, next) => {
        req.result = await api.getPower();
        return next();
    }, ok);
    server.post('/main/power/toggle', async(req, res, next) => {
        req.result = await api.togglePower();
        return next();
    }, ok);
    server.post('/main/power/:value', checkBoolean('value'), async(req, res) => {
        await api.setPower(req.params.value);
        return res.json(204);
    });
    server.get('/zones/:zone/power', checkZone, async(req, res, next) => {
        req.result = await api.getPower(req.params.zone);
        return next();
    }, ok);
    server.post('/zones/:zone/power/toggle', checkZone, async(req, res, next) => {
        req.result = await api.togglePower(req.params.zone);
        return next();
    }, ok);
    server.post('/zones/:zone/power/:value', checkBoolean('value'), checkZone, async(req, res) => {
        await api.setPower(req.params.value, req.params.zone);
        return res.json(204);
    });

    // Volume Endpoints
    server.get('/main/volume', async(req, res, next) => {
        req.result = await api.getVolume();
        return next();
    }, ok);
    server.post('/main/volume/:value', async(req, res) => {
        await api.setVolume(req.params.value);
        return res.json(204);
    });
    server.get('/zones/:zone/volume', checkZone, async(req, res, next) => {
        req.result = await api.getVolume(req.params.zone);
        return next();
    }, ok);
    server.post('/zones/:zone/volume/:value', checkZone, async(req, res) => {
        await api.setVolume(req.params.value, req.params.zone);
        return res.json(204);
    });

    // Input Endpoints
    server.get('/inputs', async(req, res, next) => {
        req.result = await api.getInputs();
        return next();
    }, ok);
    server.get('/main/input', async(req, res, next) => {
        req.result = await api.getInput();
        return next();
    }, ok);
    server.post('/main/input/:value', async(req, res) => {
        await api.setInput(req.params.value);
        return res.json(204);
    });
    server.get('/zones/:zone/input', checkZone, async(req, res, next) => {
        req.result = await api.getInput(req.params.zone);
        return next();
    }, ok);
    server.post('/zones/:zone/input/:value', checkZone, async(req, res) => {
        await api.setInput(req.params.value, req.params.zone);
        return res.json(204);
    });
};
