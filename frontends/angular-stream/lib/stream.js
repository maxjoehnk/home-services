const providers = require('./providers');
const logger = require('./logger');

module.exports = config => {
    const {
        getProviderByName,
        fetchInputs,
        fetchLights,
        fetchCasts,
        fetchWeather,
        fetchForecast
    } = providers(config);

    const fetchYamahaAvrCard = async(provider, { priority, name }) => {
        const payload = {
            name,
            inputs: await fetchInputs(provider)
        };
        const card = {
            type: 'yamaha-avr',
            priority,
            payload
        };
        return card;
    };

    const fetchPhilipsHueCards = async(provider, { priority, filter }) => {
        const lights = await fetchLights(provider);
        return lights
            .filter(({ id, name }) => {
                if (filter) {
                    return filter.includes(id) || filter.includes(name);
                }
                return true;
            })
            .map(light => ({
                id: light.id,
                type: light.type,
                name: light.name,
                state: {
                    power: light.state.on,
                    brightness: light.state.bri,
                    hue: light.state.hue,
                    saturation: light.state.sat,
                    effect: light.state.effect,
                    xy: light.state.xy,
                    ct: light.state.ct,
                    alert: light.state.alert,
                    colormode: light.state.colormode,
                    reachable: light.state.reachable
                }
            }))
            .map(payload => ({
                type: 'philips-hue',
                payload,
                priority
            }));
    };

    const fetchGoogleCastCards = async(provider, { priority, filter, idle }) => {
        const casts = await fetchCasts(provider, !!idle);
        return casts
            .filter(({ id, name }) => {
                if (filter) {
                    return filter.includes(id) || filter.includes(name);
                }
                return true;
            })
            .map(payload => ({
                type: 'google-cast',
                payload,
                priority
            }));
    };

    const fetchWeatherCards = async (provider, { priority }) => {
        const [current, forecast] = await Promise.all([
            fetchWeather(provider),
            fetchForecast(provider)
        ]);
        return {
            type: 'weather',
            payload: {
                current,
                forecast
            },
            priority
        };
    };

    const fetchStream = async() => {
        const stream = await Promise.all(config.stream.cards.map(async card => {
            switch (card.type) {
                case 'yamaha-avr': {
                    const provider = getProviderByName(card.provider);
                    try {
                        const avr = await fetchYamahaAvrCard(provider, card);
                        return [avr];
                    }catch (err) {
                        logger.error(err);
                    }
                    break;
                }
                case 'philips-hue': {
                    const provider = getProviderByName(card.provider);
                    try {
                        return await fetchPhilipsHueCards(provider, card);
                    }catch (err) {
                        logger.error(err);
                    }
                    break;
                }
                case 'google-cast': {
                    const provider = getProviderByName(card.provider);
                    try {
                        return await fetchGoogleCastCards(provider, card);
                    }catch (err) {
                        logger.error(err);
                    }
                    break;
                }
                case 'weather': {
                    const provider = getProviderByName(card.provider);
                    try {
                        const weather = await fetchWeatherCards(provider, card);
                        return [weather];
                    }catch (err) {
                        logger.error(err);
                    }
                    break;
                }
                default:
                    throw new Error(`Invalid Card Type ${card.type}`);
            }
            return [];
        }));
        return stream.reduce((a, b) => a.concat(b));
    };

    return {
        fetchStream
    };
};
