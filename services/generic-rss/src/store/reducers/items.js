const {
    CONFIG_LOAD,
    FEED_FETCH_SUCCESS
} = require('../actions');

const reduce = (state = {}, action) => {
    switch (action.type) {
        case CONFIG_LOAD: {
            const { feeds } = action.payload;
            const result = {};
            feeds.forEach(feed => {
                result[feed.id] = [];
            });
            return result;
        }
        case FEED_FETCH_SUCCESS:
            return Object.assign({}, state, {
                [action.payload.id]: action.payload.items
            });
        default:
            return state;
    }
};

module.exports = reduce;
