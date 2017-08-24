const { expect } = require('chai');
const { CONFIG_LOAD, FEED_FETCH_SUCCESS } = require('../../../src/store/actions');

const requirePath = '../../../src/store/reducers/hashes';
const reducer = require(requirePath);

describe('store/reducers/hashes', function() {
    it('should be a function', function() {
        expect(reducer).to.be.an.instanceof(Function);
    });

    it('should have an empty default state', function() {
        expect(reducer(undefined, {})).to.deep.equal({});
    });

    it(`should reduce ${CONFIG_LOAD}`, function() {
        const config = {
            feeds: [
                {
                    id: 'frontendhappyhour',
                    url: 'http://feeds.soundcloud.com/users/soundcloud:users:206137365/sounds.rss',
                    notify: [
                        'http://google.com'
                    ]
                }
            ]
        };
        const action = {
            type: CONFIG_LOAD,
            payload: config
        };
        expect(reducer({}, action)).to.eql({
            frontendhappyhour: {
                current: null,
                last: null
            }
        });
    });

    it(`should reduce ${FEED_FETCH_SUCCESS}`, function() {
        const state = {
            frontendhappyhour: {
                current: 'ju455jn43k5n34h5b3hjbj5',
                last: null
            }
        };
        const hash = 'i43th4ith45i4h3jh45435';
        const action = {
            type: FEED_FETCH_SUCCESS,
            payload: {
                id: 'frontendhappyhour',
                hash
            }
        };
        expect(reducer(state, action)).to.eql({
            frontendhappyhour: {
                current: hash,
                last: state.frontendhappyhour.current
            }
        });
    });
});
