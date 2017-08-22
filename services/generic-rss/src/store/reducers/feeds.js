const {
    CONFIG_FEED_LOAD
} = require('../actions');

const reduce = (state = {}, action) => {
    switch (action.type) {
        case CONFIG_FEED_LOAD: {
            const result = {};
            action.payload.forEach(feed => {
                result[feed.id] = feed;
            });
            return result;
        }
        default:
            return state;
    }
};

module.exports = reduce;
