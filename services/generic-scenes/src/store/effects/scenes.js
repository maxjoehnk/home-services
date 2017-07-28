const { takeEvery, select } = require('redux-saga/effects');
const { ACTIVATE_SCENE, ACTIVATE_STATE } = require('../actions');
const { getScenes } = require('../selectors');
const fetch = require('node-fetch');
const logger = require('../../logger');

function* activateScene(action) {
    const scenes = yield select(getScenes);
    const scene = scenes[action.payload];
    logger.debug(`Activating Scene ${action.payload}`);
    if (scene.enabled) {
        const state = scene.states[scene.default];
        yield executeState(state);
    }else {
        logger.debug('Skipping activation, scene is disabled');
    }
}

function* activateState(action) {
    const scenes = yield select(getScenes);
    const scene = scenes[action.payload.scene];
    logger.debug(`Activating State ${action.payload.state} of Scene ${action.payload.scene}`);
    if (scene.enabled) {
        const state = scene.states[action.payload.state];
        yield executeState(state);
    }else {
        logger.debug('Skipping activation, scene is disabled');
    }
}

function* executeState(state) {
    for (let i = 0; i < state.length; i++) {
        logger.debug(`Fetching Url ${state[i]}`);
        try {
            yield fetch(state[i]);
        }catch (err) {
            logger.error(err, `Error while fetching ${state[i]}`);
        }
    }
}

function* scenesSaga() {
    yield takeEvery(ACTIVATE_SCENE, activateScene);
    yield takeEvery(ACTIVATE_STATE, activateState);
}

module.exports = scenesSaga;
