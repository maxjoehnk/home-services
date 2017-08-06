const { Router } = require('express');
const { stream } = require('../stubs');

const router = new Router();

router.get('/stream', (req, res) => {
    res.status(200);
    res.json(stream);
    res.end();
});

module.exports = router;
