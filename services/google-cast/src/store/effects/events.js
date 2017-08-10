const { takeEvery, select } = require('redux-saga/effects');
const logger = require('../../logger');
const {
    APPLICATION_LAUNCH,
    APPLICATION_EXIT,
    VOLUME_CHANGE,
    VOLUME_MUTE,
    VOLUME_UNMUTE
} = require('../actions');
const execute = require('../../../../../shared/url-executor');

function emit(event) {
    return function* (action) {
        const id = action.payload.device || action.payload;
        if (typeof id !== 'string') {
            logger.warn('Invalid Device ID', id);
        }
        const name = yield select(({ names }) => names[id]);
        const emitters = yield select(({ events }) => events[name] ? events[name][event] : []);
        if (emitters && emitters.length > 0) {
            logger.debug(`Emitting ${event} for ${id} (${name})`);
            const application = yield select(({ devices }) => devices[id].application);
            emitters.forEach(emitter => {
                if (emitter.applications) {
                    if (!emitter.applications.includes(application.displayName)) {
                        logger.debug(`Skipping Event Execution for Event ${event}`, emitter);
                        return;
                    }
                }
                logger.debug(`Executing Event Handler for ${event}`, emitter);
                execute(emitter.urls)
                    .then(() => logger.debug('Executed Urls', emitter.urls))
                    .catch(err => logger.error(err));
            });
        }
    };
}

function* eventsSaga() {
    yield takeEvery(APPLICATION_LAUNCH, emit('launch'));
    yield takeEvery(APPLICATION_EXIT, emit('exit'));
    yield takeEvery(VOLUME_CHANGE, emit('volume'));
    yield takeEvery(VOLUME_MUTE, emit('mute'));
    yield takeEvery(VOLUME_UNMUTE, emit('unmute'));
}

module.exports = eventsSaga;
