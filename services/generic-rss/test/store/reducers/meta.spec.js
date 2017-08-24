const { expect } = require('chai');
const { FEED_FETCH_SUCCESS } = require('../../../src/store/actions');

const requirePath = '../../../src/store/reducers/meta';
const reducer = require(requirePath);

describe('store/reducers/meta', function() {
    it('should be a function', function() {
        expect(reducer).to.be.an.instanceof(Function);
    });

    it('should have an empty default state', function() {
        expect(reducer(undefined, {})).to.deep.equal({});
    });

    it(`should reduce ${FEED_FETCH_SUCCESS}`, function() {
        const state = {};
        const meta = {
            title: 'Test'
        };
        const action = {
            type: FEED_FETCH_SUCCESS,
            payload: {
                id: 'frontendhappyhour',
                meta
            }
        };
        expect(reducer(state, action)).to.eql({
            frontendhappyhour: meta
        });
    });
});
