const { LOAD_SCENES, ENABLE_SCENE, DISABLE_SCENE, ACTIVATE_SCENE, DEACTIVATE_SCENE } = require('../actions/scenes');

function sceneReducer(state, action) {
    switch (action.type) {
        case ENABLE_SCENE:
            return Object.assign({}, state, {
                enabled: true
            });
        case DISABLE_SCENE:
            return Object.assign({}, state, {
                enabled: false
            });
        case ACTIVATE_SCENE:
            if (state.enabled) {
                return Object.assign({}, state, {
                    activated: true
                });
            }else {
                return state;
            }
        case DEACTIVATE_SCENE:
            return Object.assign({}, state, {
                activated: false
            });
    }
}

function scenesReducer(state = {}, action) {
    switch (action.type) {
        case LOAD_SCENES:
            return action.payload;
        case ENABLE_SCENE:
        case DISABLE_SCENE:
        case ACTIVATE_SCENE:
        case DEACTIVATE_SCENE:
            return Object.assign({}, state, {
                [action.payload]: sceneReducer(state[action.payload], action)
            });
        default:
            return state;
    }
}

module.exports = scenesReducer;
