const openweathermap = require('openweathermap');
const logger = require('./logger');

module.exports = ({ api, apiKey }) => {
    openweathermap.defaults(Object.assign({}, api, {
        APPID: apiKey
    }));

    const fetchForecast = () => new Promise((resolve, reject) => {
        logger.debug('Fetching Forecast');
        openweathermap.daily({ cnt: 5 }, (err, forecast) => {
            if (err) {
                logger.error(err);
                return reject(err);
            }
            if (forecast.cod !== '200') {
                logger.error(forecast);
                return reject(forecast);
            }
            resolve(forecast.list.map(day => ({
                weather: day.weather[0],
                day: new Date(day.dt * 1000),
                temperature: {
                    min: day.temp.min,
                    max: day.temp.max,
                    day: day.temp.day
                },
                pressure: day.pressure,
                humidity: day.humidity,
                wind: {
                    speed: day.speed,
                    direction: day.deg
                },
                cloudiness: day.clouds
            })));
        });
    });

    const fetchWeather = () => new Promise((resolve, reject) => {
        logger.debug('Fetching Weather');
        openweathermap.now({}, (err, weather) => {
            if (err) {
                logger.error(err);
                return reject(err);
            }
            if (weather.cod !== 200) {
                logger.error(weather);
                return reject(weather);
            }
            resolve({
                weather: weather.weather[0],
                temperature: {
                    min: weather.main.temp_min,
                    max: weather.main.temp_max,
                    current: weather.main.temp
                },
                pressure: weather.main.pressure,
                humidity: weather.main.humidity,
                wind: {
                    speed: weather.wind.speed,
                    direction: weather.wind.deg
                },
                cloudiness: weather.clouds.all
            });
        });
    });

    return {
        fetchForecast,
        fetchWeather
    };
};
