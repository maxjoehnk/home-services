const { Router } = require('express');
const { stream, chips } = require('../stubs');

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

module.exports = router;
