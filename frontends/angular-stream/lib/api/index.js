const { Router } = require('express');
const { stream, chips } = require('../stubs');
const providers = require('../providers');

module.exports = config => {
    const router = new Router();
    const { fetchScenes } = providers(config);

    router.get('/stream', (req, res) => {
        res.status(200);
        res.json(stream);
        res.end();
    });

    router.get('/chips', (req, res) => {
        res.status(200);
        res.json(chips);
        res.end();
    });

    router.get('/scenes', async(req, res, next) => {
        try {
            const scenes = await fetchScenes();
            res.status(200);
            res.json(scenes);
            res.end();
        }catch (err) {
            return next(err);
        }
    });

    router.get('/configuration', (req, res) => {
        res.status(200);
        const { stream, actions, scenes, presence } = config;
        res.json({
            stream: stream.enabled,
            chips: actions.enabled,
            scenes: scenes.enabled,
            presence: presence.enabled
        });
        res.end();
    });

    return router;
};
