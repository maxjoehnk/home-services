const CONFIG_FEED_LOAD = '[Config] Feed Load';

const configFeedLoad = ({ feeds }) => ({
    type: CONFIG_FEED_LOAD,
    payload: feeds
});

module.exports = {
    CONFIG_FEED_LOAD,
    configFeedLoad
};
