const { expect } = require('chai');

const requirePath = '../../../src/store/actions/feed';
const action = require(requirePath);

describe('store/actions/feed', function() {
    it('should be an object', function() {
        expect(action).to.be.an.instanceof(Object);
    });

    describe('FEED_FETCH', function() {
        it('should be defined', function() {
            expect(action.FEED_FETCH).to.be.a('string');
        });
    });

    describe('FEED_FETCH_SUCCESS', function() {
        it('should be defined', function() {
            expect(action.FEED_FETCH_SUCCESS).to.be.a('string');
        });
    });

    describe('feedFetch', function() {
        it('should be defined', function() {
            expect(action.feedFetch).to.be.an.instanceof(Function);
        });

        it('should return an action', function() {
            const id = 'frontendhappyhour';
            expect(action.feedFetch(id)).to.eql({
                type: action.FEED_FETCH,
                payload: id
            });
        });
    });

    describe('feedFetchSuccess', function() {
        it('should be defined', function() {
            expect(action.feedFetchSuccess).to.be.an.instanceof(Function);
        });

        it('should return an action', function() {
            const id = 'frontendhappyhour';
            const feed = {
                meta: {
                    title: 'test'
                },
                items: [{
                    title: 'entry'
                }],
                hash: 'ln4kj32k4jn3324'
            };
            expect(action.feedFetchSuccess(id, feed)).to.eql({
                type: action.FEED_FETCH_SUCCESS,
                payload: {
                    id,
                    meta: feed.meta,
                    items: feed.items,
                    hash: feed.hash
                }
            });
        });
    });
});
