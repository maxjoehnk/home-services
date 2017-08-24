const { expect } = require('chai');

const requirePath = '../../../src/store/actions/config';
const action = require(requirePath);

describe('store/actions/config', function() {
    it('should be an object', function() {
        expect(action).to.be.an.instanceof(Object);
    });

    describe('CONFIG_LOAD', function() {
        it('should be defined', function() {
            expect(action.CONFIG_LOAD).to.be.a('string');
        });
    });

    describe('configLoad', function() {
        it('should be defined', function() {
            expect(action.configLoad).to.be.an.instanceof(Function);
        });

        it('should return an action', function() {
            const config = {
                port: 8080,
                timeout: 12300
            };
            expect(action.configLoad(config)).to.eql({
                type: action.CONFIG_LOAD,
                payload: config
            });
        });
    });
});
