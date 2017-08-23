const { delay } = require('redux-saga');
const { takeEvery, select, put, all, call } = require('redux-saga/effects');
const logger = require('../../logger');
const { parse } = require('../../feed');
const {
    CONFIG_LOAD,
    FEED_FETCH,
    feedFetch,
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

function* setup() {
    const { interval } = yield select(({ config }) => config);
    yield refresh();
    while (true) {
        yield call(delay, interval);
        yield refresh();
    }
}

function* refresh() {
    const feeds = yield select(({ feeds }) => Object.getOwnPropertyNames(feeds));
    yield all(feeds.map(id => put(feedFetch(id))));
}

function* eventsSaga() {
    yield takeEvery(FEED_FETCH, fetch);
    yield takeEvery(CONFIG_LOAD, setup);
}

module.exports = eventsSaga;
