const {
    CONFIG_LOAD
} = require('../actions');

const reduce = (state = {}, action) => {
    switch (action.type) {
        case CONFIG_LOAD: {
            const { feeds } = action.payload;
            const result = {};
            feeds.forEach(feed => {
                result[feed.id] = feed;
            });
            return result;
        }
        default:
            return state;
    }
};

module.exports = reduce;
