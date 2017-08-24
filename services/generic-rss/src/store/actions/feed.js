const FEED_FETCH = '[Feed] Fetch';
const FEED_FETCH_SUCCESS = '[Feed] Fetch Success';

const feedFetch = id => ({
    type: FEED_FETCH,
    payload: id
});

const feedFetchSuccess = (id, { meta, items, hash }) => ({
    type: FEED_FETCH_SUCCESS,
    payload: {
        id,
        meta,
        items,
        hash
    }
});

module.exports = {
    FEED_FETCH,
    FEED_FETCH_SUCCESS,
    feedFetch,
    feedFetchSuccess
};
