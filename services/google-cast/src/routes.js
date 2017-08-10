const { NotFoundError } = require('restify-errors');

module.exports = (server, { getState }) => {

    const getDevice = (req, res, next) => {
        const state = getState();
        const device = state.devices[req.params.device];
        if (typeof device !== 'undefined') {
            req.device = device;
            return next();
        }
        return next(new NotFoundError(`Device ${req.params.device} is not available`));
    };

    server.get('/devices', (req, res) => {
        const state = getState();
        res.status(200);
        res.json(state.devices);
        res.end();
    });

    server.get('/devices/:device', getDevice, (req, res) => {
        res.status(200);
        res.json(req.device);
        res.end();
    });

    server.get('/devices/:device/application', getDevice, (req, res) => {
        const { application } = req.device;
        if (application) {
            res.status(200);
            res.json(application);
            return res.end();
        }
        res.status(204);
        res.end();
    });

    server.get('/devices/:device/media', getDevice, (req, res) => {
        const { media } = req.device;
        if (media) {
            res.status(200);
            res.json(media);
            return res.end();
        }
        res.status(204);
        res.end();
    });
};
