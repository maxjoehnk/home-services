const { delay } = require('redux-saga');
const { takeEvery, select, put, all, call } = require('redux-saga/effects');
const logger = require('../../logger');
const { parse } = require('../../feed');
const hash = require('object-hash');
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
        const { meta, items } = yield parse(url);
        const hashed = hash(items);
        yield put(feedFetchSuccess(id, {
            meta,
            items,
            hash: hashed
        }));
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

function* feedSaga() {
    yield takeEvery(FEED_FETCH, fetch);
    yield takeEvery(CONFIG_LOAD, setup);
}

module.exports = feedSaga;
