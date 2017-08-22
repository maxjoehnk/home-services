const { takeEvery, select, put } = require('redux-saga/effects');
const logger = require('../../logger');
const { parse } = require('../../feed');
const {
    FEED_FETCH,
    feedFetchSuccess
} = require('../actions');

function* fetch(action) {
    const { payload: id } = action;
    const { url } = yield select(({ feeds }) => feeds[id]);
    try {
        const feed = yield parse(url);
        yield put(feedFetchSuccess(id, feed));
    }catch (err) {
        logger.error(err);
    }
}

function* eventsSaga() {
    yield takeEvery(FEED_FETCH, fetch);
}

module.exports = eventsSaga;
