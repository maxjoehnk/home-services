const { CAST_OFFLINE, CAST_ONLINE } = require('../actions');

const reduceDevice = (state, action) => {
    switch (action.type) {
        case CAST_ONLINE:
            return {
                name: action.payload.name,
                id: action.payload.service.name
            };
        default:
            return state;
    }
};

const reduce = (state = {}, action) => {
    switch (action.type) {
        case CAST_ONLINE:
            return Object.assign({}, state, {
                [action.payload.name]: reduceDevice({}, action)
            });
        case CAST_OFFLINE: {
            const deviceNames = Object.getOwnPropertyNames(state)
                .filter(device => device !== action.payload);
            const result = {};
            deviceNames.forEach(name => {
                result[name] = state[name];
            });
            return result;
        }
        default:
            return state;
    }
};

module.exports = reduce;
