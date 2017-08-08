const logger = require('./logger');
const store = require('./store');
const selectors = require('./store/selectors');
const actions = require('./store/actions');

async function getAllScenes(req, res) {
    logger.trace('routes.getAllScenes');
    const scenes = selectors.getScenes(store.getState());
    const response = Object.getOwnPropertyNames(scenes)
        .map(id => {
            const { name, states } = scenes[id];
            return {
                id,
                name: name || id,
                states: states ? Object.getOwnPropertyNames(states) : []
            };
        });
    res.json(200, response);
}

async function isSceneActive(req, res) {
    logger.trace('routes.isSceneActive');
    const { active } = selectors.getScenes(store.getState())[req.params.scene];
    res.json(200, active);
}

async function activateScene(req, res) {
    logger.trace('routes.activateScene');
    store.dispatch(actions.activateScene(req.params.scene));
    res.json(204);
}

async function deactivateScene(req, res) {
    logger.trace('routes.deactivateScene');
    store.dispatch(actions.deactivateScene(req.params.scene));
    res.json(204);
}

async function isEnabled(req, res) {
    logger.trace('routes.isEnabled');
    const { enabled } = selectors.getScenes(store.getState())[req.params.scene];
    res.json(200, enabled);
}

async function enableScene(req, res) {
    logger.trace('routes.enableScene');
    store.dispatch(actions.enableScene(req.params.scene));
    res.send(204);
}

async function disableScene(req, res) {
    logger.trace('routes.disableScene');
    store.dispatch(actions.disableScene(req.params.scene));
    res.send(204);
}

async function getStates(req, res) {
    logger.trace('routes.getStates');
    const { states } = selectors.getScenes(store.getState())[req.params.scene];
    res.json(200, states);
}

async function activateState(req, res) {
    logger.trace('routes.activateState');
    store.dispatch(actions.activateState(req.params.scene, req.params.state));
    res.send(204);
}

module.exports = {
    getAllScenes,
    isSceneActive,
    activateScene,
    deactivateScene,
    isEnabled,
    enableScene,
    disableScene,
    getStates,
    //isStateActive,
    activateState
};
