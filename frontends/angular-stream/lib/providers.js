const fetch = require('node-fetch');

module.exports = config => {
    const getProvidersOfType = type =>
        config.providers.filter(provider => provider.type === type);

    const fetchScenes = async() => {
        const scenes = await Promise.all(getProvidersOfType('generic-scenes')
            .map(({ url }) => fetch(`${url}/scenes`)
                .then(async res => {
                    if (res.ok) {
                        return res;
                    }
                    const body = await res.json();
                    throw new Error(body.message);
                })
                .then(res => res.json())
            ));
        return scenes.reduce((a, b) => a.concat(b));
    };

    return {
        getProvidersOfType,
        fetchScenes
    };
};
