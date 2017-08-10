let state = {};

module.exports = {
    getForecast: () => state.forecast,
    getWeather: () => state.weather,
    updateForecast: forecast => {
        state = Object.assign({}, state, {
            forecast
        });
    },
    updateWeather: weather => {
        state = Object.assign({}, state, {
            weather
        });
    }
};
