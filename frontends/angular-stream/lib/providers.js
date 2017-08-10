const fetch = require('node-fetch');

module.exports = config => {
    const getProvidersOfType = type =>
        config.providers.filter(provider => provider.type === type);

    const getProviderByName = name => config.providers.find(provider => provider.name === name);

    const _fetchScenes = async() => {
        const providers = getProvidersOfType('generic-scenes');
        return await Promise.all(providers.map(({ url }) =>
            fetch(`${url}/scenes`)
                .then(async res => {
                    if (res.ok) {
                        return res;
                    }
                    const body = await res.json();
                    throw new Error(body.message);
                })
                .then(res => res.json())
        ));
    };

    const findProviderByScene = async scene => {
        const providers = getProvidersOfType('generic-scenes');
        const scenes = await _fetchScenes();
        const sceneIds = scenes.map(sceneList => sceneList.map(({ id }) => id));
        for (let i in sceneIds) {
            if (sceneIds[i].includes(scene)) {
                return providers[i];
            }
        }
        return null;
    };

    const fetchScenes = async() => {
        const providers = getProvidersOfType('generic-scenes');
        const scenes = await _fetchScenes();
        const all = scenes.reduce((a, b) => a.concat(b));
        let icons = {};
        providers.forEach(provider => {
            if (provider.icons) {
                icons = Object.assign({}, icons, provider.icons);
            }
        });
        return all.map(scene => Object.assign({
            icon: icons[scene.id]
        }, scene));
    };

    const fetchInputs = ({ url }) => fetch(`${url}/inputs`)
        .then(async res => {
            if (res.ok) {
                return res;
            }
            const body = await res.json();
            throw new Error(body.message);
        })
        .then(res => res.json());

    const fetchLights = ({ url }) => fetch(`${url}/lights`)
        .then(async res => {
            if (res.ok) {
                return res;
            }
            const body = await res.json();
            throw new Error(body.message);
        })
        .then(res => res.json());

    const fetchCasts = ({ url }, idle) => fetch(`${url}/devices?idle=${!!idle}`)
        .then(async res => {
            if (res.ok) {
                return res;
            }
            const body = await res.json();
            throw new Error(body.message);
        })
        .then(res => res.json());

    const mapCodeToIcon = code => {
        let icon = 'mdi-weather-';
        switch(code) {
            case 300:
            case 301:
            case 302:
            case 310:
            case 311:
            case 312:
            case 313:
            case 314:
            case 321:
                icon += 'rainy';
                break;
            case 500:
            case 501:
            case 502:
            case 503:
            case 504:
            case 511:
            case 520:
            case 521:
            case 522:
            case 531:
                icon += 'pouring';
                break;
            case 600:
            case 601:
            case 602:
            case 611:
            case 612:
                icon += 'snowy';
                break;
            case 615:
            case 616:
            case 620:
            case 621:
            case 622:
                icon += 'snowy-rain';
                break;
            case 701:
            case 711:
            case 721:
            case 731:
            case 741:
            case 751:
            case 761:
            case 762:
            case 771:
            case 781:
                icon += 'fog';
                break;
            case 800:
                icon += 'sunny';
                break;
            case 801:
            case 802:
            case 803:
            case 804:
                icon += 'cloudy';
                break;
        }
        return icon;
    }

    const fetchWeather = ({ url }) => fetch(`${url}/weather`)
        .then(async res => {
            if (res.ok) {
                return res;
            }
            const body = await res.json();
            throw new Error(body.message);
        })
        .then(res => res.json())
        .then(({ weather, temperature, pressure, humidity, wind, cloudiness }) => ({
            icon: mapCodeToIcon(weather.id),
            description: weather.description,
            temperature,
            pressure,
            humidity,
            wind,
            cloudiness
        }));

    const fetchForecast = ({ url }) => fetch(`${url}/forecast`)
        .then(async res => {
            if (res.ok) {
                return res;
            }
            const body = await res.json();
            throw new Error(body.message);
        })
        .then(res => res.json())
        .then(forecast => forecast.map(({ weather, day, temperature, pressure, humidity, wind, cloudiness }) => ({
            date: day,
            weather: {
                icon: mapCodeToIcon(weather.id),
                description: weather.description,
                temperature,
                pressure,
                humidity,
                wind,
                cloudiness
            }
        })));

    const activateScene = ({ url }, scene) => fetch(`${url}/scenes/${scene}/activate`);

    return {
        getProvidersOfType,
        getProviderByName,
        fetchScenes,
        findProviderByScene,
        activateScene,
        fetchInputs,
        fetchLights,
        fetchCasts,
        fetchWeather,
        fetchForecast
    };
};
