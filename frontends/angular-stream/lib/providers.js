const fetch = require('node-fetch');

module.exports = config => {
    const getProvidersOfType = type =>
        config.providers.filter(provider => provider.type === type);

    const fetchScenes = async() => {
        const providers = getProvidersOfType('generic-scenes');
        const scenes = await Promise.all(providers.map(({ url }) =>
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

    return {
        getProvidersOfType,
        fetchScenes
    };
};
