const { put, takeEvery, select } = require('redux-saga/effects');
const {
    MEDIA_STATUS,
    mediaState,
    mediaMetadata,
    mediaDuration,
    mediaCurrentTime,
    mediaPlaybackRate
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

    if (current && current.media &&
        typeof current.media.duration !== 'undefined' &&
        (!last || (last &&
            last.media &&
            last.media.duration !== current.media.duration))) {
        yield put(mediaDuration(device, current.media.duration));
    }

    if (current &&
        typeof current.currentTime !== 'undefined' &&
        (!last || last.currentTime !== current.currentTime)) {
        yield put(mediaCurrentTime(device, current.currentTime));
    }

    if (current &&
        typeof current.playbackRate !== 'undefined' &&
        (!last || last && last.playbackRate !== current.playbackRate)) {
        yield put(mediaPlaybackRate(device, current.playbackRate));
    }
}

function* mediaSaga() {
    yield takeEvery(MEDIA_STATUS, mediaStatus);
}

module.exports = mediaSaga;
