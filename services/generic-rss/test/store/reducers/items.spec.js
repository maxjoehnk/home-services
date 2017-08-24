const { expect } = require('chai');
const { CONFIG_LOAD, FEED_FETCH_SUCCESS } = require('../../../src/store/actions');

const requirePath = '../../../src/store/reducers/items';
const reducer = require(requirePath);

describe('store/reducers/items', function() {
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
            frontendhappyhour: []
        });
    });

    it(`should reduce ${FEED_FETCH_SUCCESS}`, function() {
        const state = {
            frontendhappyhour: []
        };
        const items = [{
            title: 'test'
        }];
        const action = {
            type: FEED_FETCH_SUCCESS,
            payload: {
                id: 'frontendhappyhour',
                items
            }
        };
        expect(reducer(state, action)).to.eql({
            frontendhappyhour: items
        });
    });
});
