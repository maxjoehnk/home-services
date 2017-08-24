const {
    FEED_FETCH_SUCCESS
} = require('../actions');

const reduce = (state = {}, action) => {
    switch (action.type) {
        case FEED_FETCH_SUCCESS:
            return Object.assign({}, state, {
                [action.payload.id]: action.payload.meta
            });
        default:
            return state;
    }
};

module.exports = reduce;
