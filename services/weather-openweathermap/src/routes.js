const cache = require('./cache');

module.exports = server => {
    server.get('/weather', (req, res) => {
        res.status(200);
        res.json(cache.getWeather());
        res.end();
    });

    server.get('/forecast', (req, res) => {
        res.status(200);
        res.json(cache.getForecast());
        res.end();
    });
};
