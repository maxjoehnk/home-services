const {
    CONFIG_FEED_LOAD,
    FEED_FETCH_SUCCESS
} = require('../actions');

const reduce = (state = {}, action) => {
    switch (action.type) {
        case CONFIG_FEED_LOAD: {
            const result = {};
            action.payload.forEach(feed => {
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
