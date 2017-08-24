const {
    CONFIG_LOAD
} = require('../actions');

const reduce = (state = {}, action) => {
    switch (action.type) {
        case CONFIG_LOAD:
            return action.payload;
        default:
            return state;
    }
};

module.exports = reduce;
