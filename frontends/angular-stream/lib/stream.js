const providers = require('./providers');

module.exports = config => {
    const {
        getProviderByName,
        fetchInputs,
        fetchLights
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

    const fetchStream = async() => {
        const stream = await Promise.all(config.stream.cards.map(async card => {
            switch (card.type) {
                case 'yamaha-avr': {
                    const provider = getProviderByName(card.provider);
                    const avr = await fetchYamahaAvrCard(provider, card);
                    return [avr];
                }
                case 'philips-hue': {
                    const provider = getProviderByName(card.provider);
                    const lights = await fetchPhilipsHueCards(provider, card);
                    return lights;
                }
                default:
                    throw new Error(`Invalid Card Type ${card.type}`);
            }
        }));
        return stream.reduce((a, b) => a.concat(b));
    };

    return {
        fetchStream
    };
};
