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

        it('should pass the given zone', async function() {
            const value = -200;
            const zone = 'Main_Zone';
            mock.getVolume.resolves(value);
            const result = await instance.getVolume(zone);
            expect(result).to.equal(value);
            expect(mock.getVolume).to.have.been.calledWith(zone);
        });
    });

    describe('setVolume', function() {
        let mock;
        let instance;

        beforeEach(function() {
            mock = {
                setVolume: stub()
            };
            instance = api(mock);
        });

        it('should be defined', function() {
            expect(instance.setVolume).to.be.an.instanceof(Function);
        });

        it('should call avr.setVolume', async function() {
            const value = 100;
            mock.setVolume.resolves(value);
            await instance.setVolume(value);
            expect(mock.setVolume).to.have.been.calledWith(value);
        });

        it('should throw when avr.setVolume throws', async function() {
            mock.setVolume.rejects();
            await expect(instance.setVolume()).to.be.rejected;
        });

        it('should pass the given zone', async function() {
            const value = -200;
            const zone = 'Main_Zone';
            mock.setVolume.resolves(value);
            await instance.setVolume(value, zone);
            expect(mock.setVolume).to.have.been.calledWith(value, zone);
        });
    });

    describe('getPower', function() {
        let mock;
        let instance;

        beforeEach(function() {
            mock = {
                isOn: stub()
            };
            instance = api(mock);
        });

        it('should be defined', function() {
            expect(instance.getPower).to.be.an.instanceof(Function);
        });

        it('should call avr.isOn', async function() {
            const value = true;
            mock.isOn.resolves(value);
            const result = await instance.getPower();
            expect(result).to.equal(value);
            expect(mock.isOn).to.have.been.called;
        });

        it('should throw when avr.isOn throws', async function() {
            mock.isOn.rejects();
            await expect(instance.getPower()).to.be.rejected;
        });

        it('should pass the given zone', async function() {
            const value = false;
            const zone = 'Main_Zone';
            mock.isOn.resolves(value);
            const result = await instance.getPower(zone);
            expect(result).to.equal(value);
            expect(mock.isOn).to.have.been.calledWith(zone);
        });
    });

    describe('setPower', function() {
        let mock;
        let instance;

        beforeEach(function() {
            mock = {
                powerOn: stub(),
                powerOff: stub()
            };
            instance = api(mock);
        });

        it('should be defined', function() {
            expect(instance.setPower).to.be.an.instanceof(Function);
        });

        it('should call avr.powerOn when power is true', async function() {
            mock.powerOn.resolves();
            await instance.setPower(true);
            expect(mock.powerOn).to.have.been.called;
            expect(mock.powerOff).not.to.have.been.called;
        });

        it('should call avr.powerOn when power is true', async function() {
            mock.powerOff.resolves();
            await instance.setPower(false);
            expect(mock.powerOn).not.to.have.been.called;
            expect(mock.powerOff).to.have.been.called;
        });

        it('should throw when avr.powerOn throws', async function() {
            mock.powerOn.rejects();
            await expect(instance.setPower(true)).to.be.rejected;
        });

        it('should throw when avr.powerOff throws', async function() {
            mock.powerOff.rejects();
            await expect(instance.setPower(false)).to.be.rejected;
        });

        it('should pass the given zone to powerOn', async function() {
            const zone = 'Main_Zone';
            mock.powerOn.resolves();
            await instance.setPower(true, zone);
            expect(mock.powerOn).to.have.been.calledWith(zone);
        });

        it('should pass the given zone to powerOff', async function() {
            const zone = 'Main_Zone';
            mock.powerOn.resolves();
            await instance.setPower(false, zone);
            expect(mock.powerOff).to.have.been.calledWith(zone);
        });
    });
});
