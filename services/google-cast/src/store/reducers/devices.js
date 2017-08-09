const {
    CAST_OFFLINE,
    CAST_ONLINE,
    CAST_STATUS
} = require('../actions');

const reduceDevice = (state, action) => {
    switch (action.type) {
        case CAST_ONLINE:
            return {
                name: action.payload.txtRecord.fn,
                id: action.payload.name
            };
        case CAST_STATUS: {
            const { volume, applications } = action.payload.status;
            let application = null;
            if (applications) {
                application = applications[0];
            }
            return Object.assign({}, state, {
                volume: volume.level,
                mute: volume.muted,
                application: application ? {
                    id: application.appId,
                    displayName: application.displayName,
                    statusText: application.statusText,
                    namespaces: application.namespaces.map(({ name }) => name)
                } : null
            });
        }
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
        case CAST_STATUS:
            return Object.assign({}, state, {
                [action.payload.device]: reduceDevice(state[action.payload.device], action)
            });
        default:
            return state;
    }
};

module.exports = reduce;
