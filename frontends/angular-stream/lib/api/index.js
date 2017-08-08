const { Router } = require('express');
const { stream, chips, presence } = require('../stubs');
const providers = require('../providers');

module.exports = config => {
    const router = new Router();
    const {
        fetchScenes,
        findProviderByScene,
        activateScene
    } = providers(config);

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

    router.get('/presence', (req, res) => {
        res.status(200);
        res.json(presence);
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

    router.post('/scenes/:scene/activate', async(req, res, next) => {
        try {
            const provider = await findProviderByScene(req.params.scene);
            if (provider !== null) {
                await activateScene(provider, req.params.scene);
                res.status(204);
                return res.end();
            }
            res.status(404);
            return res.end();
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
