const { takeEvery, select } = require('redux-saga/effects');
const execute = require('../../../../../shared/url-executor');
const {
    FEED_FETCH_SUCCESS
} = require('../actions');

function* notify(action) {
    const { id } = action.payload;
    const { current, last } = yield select(({ hashes }) => hashes[id]);
    const { notify } = yield select(({ feeds }) => feeds[id]);
    if (current !== last) {
        execute(notify);
    }
}

function* notifySaga() {
    yield takeEvery(FEED_FETCH_SUCCESS, notify);
}

module.exports = notifySaga;
