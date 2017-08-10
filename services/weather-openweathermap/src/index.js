const { createServer, plugins } = require('restify');
const { defaultOptions, loadConfig } = require('./config');
const setupRoutes = require('./routes');
const logger = require('./logger');
const api = require('./api');
const cache = require('./cache');

async function update(config) {
    const {
        fetchForecast,
        fetchWeather
    } = api(config);
    const [forecast, weather] = await Promise.all([
        fetchForecast(),
        fetchWeather()
    ]);
    cache.updateForecast(forecast);
    cache.updateWeather(weather);
}

async function connect(config) {
    try {
        await update(config);
    }catch (err) {
        logger.error(err);
    }
    setInterval(async() => {
        try {
            await update(config);
        }catch (err) {
            logger.error(err);
        }
    }, 5 * 1000 * 60);
}

async function start(args) {
    try {
        const options = defaultOptions(args);
        logger.level(options.logLevel);
        const config = await loadConfig(options.config);
        const server = createServer({
            log: logger
        });
        server.use(plugins.requestLogger());
        setupRoutes(server);
        connect(config);
        server.listen(config.port, () => {
            logger.info(`Listening on Port ${config.port}`);
        });
    }catch (err) {
        logger.fatal(err);
    }
}

module.exports = {
    start
};
