const { Router } = require('express');
const { stream, chips } = require('../stubs');

module.exports = config => {
    const router = new Router();

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

    router.get('/scenes', (req, res) => {
        res.status(200);
        res.json([
            {
                id: 'movienight',
                name: 'Movie Night',
                icon: 'theater'
            }
        ]);
        res.end();
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
