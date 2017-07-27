const LOAD_SCENES = '[Scenes] Load';
const ENABLE_SCENE = '[Scenes] Enable';
const DISABLE_SCENE = '[Scenes] Disable';
const ACTIVATE_SCENE = '[Scenes] Activate';
const DEACTIVATE_SCENE = '[Scenes] Deactivate';
const ACTIVATE_STATE = '[Scenes] Activate State';

function loadScenes(scenes) {
    return {
        type: LOAD_SCENES,
        payload: scenes
    };
}

function enableScene(name) {
    return {
        type: ENABLE_SCENE,
        payload: name
    };
}

function disableScene(name) {
    return {
        type: DISABLE_SCENE,
        payload: name
    };
}

function activateScene(scene) {
    return {
        type: ACTIVATE_SCENE,
        payload: scene
    };
}

function deactivateScene(scene) {
    return {
        type: DEACTIVATE_SCENE,
        payload: scene
    };
}

function activateState(scene, state) {
    return {
        type: ACTIVATE_STATE,
        payload: {
            scene,
            state
        }
    };
}

module.exports = {
    LOAD_SCENES,
    ENABLE_SCENE,
    DISABLE_SCENE,
    ACTIVATE_SCENE,
    DEACTIVATE_SCENE,
    ACTIVATE_STATE,
    loadScenes,
    enableScene,
    disableScene,
    activateScene,
    deactivateScene,
    activateState
};
