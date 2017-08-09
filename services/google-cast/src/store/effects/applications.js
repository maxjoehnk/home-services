const { put, takeEvery, select } = require('redux-saga/effects');
const {
    CAST_STATUS,
    applicationLaunch,
    applicationExit
} = require('../actions');

function* castStatus(action) {
    const { device } = action.payload;
    const { current, last } = yield select(state => state.applications[device]);

    if (!last && current) {
        yield put(applicationLaunch(device, current));
    }
    if (last && !current) {
        yield put(applicationExit(device));
    }
    if (last && current && last.appId !== current.appId) {
        yield put(applicationExit(device));
        yield put(applicationLaunch(device, current));
    }
}

function* applicationsSaga() {
    yield takeEvery(CAST_STATUS, castStatus);
}

module.exports = applicationsSaga;
