const { expect, use } = require('chai');
const { stub, spy } = require('sinon');
const asPromised = require('chai-as-promised');
const sinonChai = require('sinon-chai');
const { resolve } = require('path');
const config = require('../src/config');

use(asPromised);
use(sinonChai);

describe('config', function() {
    it('should be an object', function() {
        expect(config).to.be.an.instanceof(Object);
    });

    describe('defaultOptions', function() {
        it('should be defined', function() {
            expect(config.defaultOptions).to.be.an.instanceof(Function);
        });

        it('should return default options when called with no arguments', function() {
            expect(config.defaultOptions()).to.deep.equal({
                config: resolve(__dirname, '../config.yml'),
                logLevel: 'warn'
            });
        });

        it('should not override argument properties', function() {
            const args = {
                config: '/config.yml',
                logLevel: 'debug'
            };
            expect(config.defaultOptions(args)).to.deep.equal(args);
        });

        it('should merge the default options with the arguments', function() {
            const args = {
                stub: 1,
                config: '/config.yml'
            };
            expect(config.defaultOptions(args)).to.deep.equal({
                config: args.config,
                logLevel: 'warn',
                stub: 1
            });
        });
    });

    describe('defaultConfig', function() {
        it('should be defined', function() {
            expect(config.defaultConfig).to.be.an.instanceof(Function);
        });

        it('should return a default config when called with no arguments', function() {
            expect(config.defaultConfig()).to.deep.equal({
                port: 8080,
                routes: {}
            });
        });

        it('should not override argument properties', function() {
            const args = {
                port: 8081,
                routes: {
                    test: {
                        url: 'http://google.com'
                    }
                }
            };
            expect(config.defaultConfig(args)).to.deep.equal(args);
        });

        it('should merge the default config with the arguments', function() {
            const args = {
                stub: 1,
                routes: {
                    test: {
                        url: 'http://google.com'
                    }
                }
            };
            expect(config.defaultConfig(args)).to.deep.equal({
                port: 8080,
                routes: args.routes,
                stub: 1
            });
        });
    });

    describe('loadConfig', function() {
        it('should be defined', function() {
            expect(config.loadConfig).to.be.an.instanceof(Function);
        });

        xit('it should read the file with utf8 encoding');
        xit('it should parse the file as yaml');
        xit('it should apply the default options');
    });
});
