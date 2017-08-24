const CONFIG_LOAD = '[Config] Load';

const configLoad = config => ({
    type: CONFIG_LOAD,
    payload: config
});

module.exports = {
    CONFIG_LOAD,
    configLoad
};
