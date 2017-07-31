const { expect, use } = require('chai');
const { stub } = require('sinon');
const asPromised = require('chai-as-promised');
const sinonChai = require('sinon-chai');
const api = require('../src/api');

use(asPromised);
use(sinonChai);

describe('api', function() {
    it('should be a function', function() {
        expect(api).to.be.an.instanceof(Function);
    });

    describe('getVolume', function() {
        let mock;
        let instance;

        beforeEach(function() {
            mock = {
                getVolume: stub()
            };
            instance = api(mock);
        });

        it('should be defined', function() {
            expect(instance.getVolume).to.be.an.instanceof(Function);
        });

        it('should call avr.getVolume', async function() {
            const value = 100;
            mock.getVolume.resolves(value);
            const result = await instance.getVolume();
            expect(result).to.equal(value);
            expect(mock.getVolume).to.have.been.called;
        });

        it('should throw when avr.getVolume throws', async function() {
            mock.getVolume.rejects();
            await expect(instance.getVolume()).to.be.rejected;
        });
    });
});
