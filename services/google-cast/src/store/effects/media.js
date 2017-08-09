const { put, takeEvery, select } = require('redux-saga/effects');
const {
    MEDIA_STATUS,
    mediaState,
    mediaMetadata
} = require('../actions');

function* mediaStatus(action) {
    const { device } = action.payload;
    const { current, last } = yield select(state => state.media[device]);

    if (current && (last && current.playerState !== last.playerState || !last)) {
        yield put(mediaState(device, current.playerState));
    }

    if (current &&
        current.media &&
        current.media.metadata &&
        (last || !last)) {
        yield put(mediaMetadata(device, current.media.metadata));
    }
}

function* mediaSaga() {
    yield takeEvery(MEDIA_STATUS, mediaStatus);
}

module.exports = mediaSaga;
