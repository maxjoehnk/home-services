const {
    CAST_OFFLINE,
    CAST_ONLINE,
    APPLICATION_LAUNCH,
    APPLICATION_EXIT,
    MEDIA_STATE,
    MEDIA_METADATA,
    VOLUME_CHANGE,
    VOLUME_MUTE,
    VOLUME_UNMUTE
} = require('../actions');

const reduceDevice = (state, action) => {
    switch (action.type) {
        case CAST_ONLINE:
            return {
                name: action.payload.txtRecord.fn,
                id: action.payload.name
            };
        case VOLUME_CHANGE:
            return Object.assign({}, state, {
                volume: action.payload.volume
            });
        case VOLUME_MUTE:
            return Object.assign({}, state, {
                mute: true
            });
        case VOLUME_UNMUTE:
            return Object.assign({}, state, {
                mute: false
            });
        case APPLICATION_LAUNCH: {
            const { appId, displayName, statusText, namespaces } = action.payload.application;
            return Object.assign({}, state, {
                application: {
                    id: appId,
                    displayName,
                    statusText,
                    namespaces: namespaces.map(({ name }) => name)
                }
            });
        }
        case APPLICATION_EXIT:
            return Object.assign({}, state, {
                application: undefined,
                media: undefined
            });
        case MEDIA_STATE:
            return Object.assign({}, state, {
                media: Object.assign({}, state.media, {
                    state: action.payload.state
                })
            });
        case MEDIA_METADATA:
            return Object.assign({}, state, {
                media: Object.assign({}, state.media, {
                    metadata: action.payload.metadata
                })
            });
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
        case APPLICATION_LAUNCH:
        case MEDIA_METADATA:
        case MEDIA_STATE:
        case VOLUME_CHANGE:
            return Object.assign({}, state, {
                [action.payload.device]: reduceDevice(state[action.payload.device], action)
            });
        case APPLICATION_EXIT:
        case VOLUME_MUTE:
        case VOLUME_UNMUTE:
            return Object.assign({}, state, {
                [action.payload]: reduceDevice(state[action.payload], action)
            });
        default:
            return state;
    }
};

module.exports = reduce;
