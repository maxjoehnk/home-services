const { expect } = require('chai');
const { CONFIG_LOAD } = require('../../../src/store/actions');

const requirePath = '../../../src/store/reducers/config';
const reducer = require(requirePath);

describe('store/reducers/config', function() {
    it('should be a function', function() {
        expect(reducer).to.be.an.instanceof(Function);
    });

    it('should have an empty default state', function() {
        expect(reducer(undefined, {})).to.deep.equal({});
    });

    it(`should reduce ${CONFIG_LOAD}`, function() {
        const config = {
            port: 8080
        };
        const action = {
            type: CONFIG_LOAD,
            payload: config
        };
        expect(reducer({}, action)).to.equal(config);
    });
});
