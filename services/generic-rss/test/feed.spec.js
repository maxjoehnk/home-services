const { expect, use } = require('chai');
const { stub, match } = require('sinon');
const {
    enable,
    disable,
    registerMock,
    registerAllowable
} = require('mockery');
const asPromised = require('chai-as-promised');
const sinonChai = require('sinon-chai');

use(asPromised);
use(sinonChai);

const requirePath = '../src/feed';
const feed = require(requirePath);

describe('feed', function() {
    it('should be an object', function() {
        expect(feed).to.be.an.instanceof(Object);
    });

    describe('parse', function() {
        let fetchMock;
        let parserMock;
        let loggerMock;
        let instance;

        before(function() {
            enable({
                useCleanCache: true
            });
            fetchMock = stub().returns(new Promise(() => {}));
            parserMock = stub();
            loggerMock = {
                debug: stub(),
                error: stub()
            };
            registerMock('node-fetch', fetchMock);
            registerMock('feedparser', parserMock);
            registerMock('./logger', loggerMock);
            registerAllowable(requirePath);
            instance = require(requirePath);
        });

        after(function() {
            disable();
        });

        it('should be defined', function() {
            expect(instance.parse).to.be.an.instanceof(Function);
        });

        it('should fetch the given url', function() {
            const url = 'http://feed';
            instance.parse(url);
            expect(fetchMock).to.have.been.calledWith(url);
        });

        it('should reject when the res is not ok', async function() {
            const url = 'http://feed';
            const res = {
                ok: false
            };
            fetchMock.resolves(res);
            try {
                await instance.parse(url);
            }catch (err) {
                expect(err.message).to.equal('Feed not reachable');
                return;
            }
            throw new Error('parse didnt throw');
        });

        it('should subscribe to parser events', function(done) {
            const url = 'http://feed';
            const res = {
                ok: true,
                body: {
                    pipe: stub()
                }
            };
            const parser = {
                on: stub(),
                read: stub(),
                meta: null
            };
            parserMock.returns(parser);
            fetchMock.resolves(res);
            instance.parse(url);
            setTimeout(() => {
                expect(parser.on).to.have.been.calledWith('error', match.func);
                expect(parser.on).to.have.been.calledWith('readable', match.func);
                expect(parser.on).to.have.been.calledWith('end', match.func);
                done();
            }, 0); // eh
        });

        it('should throw when the parser emits an error', async function() {
            const url = 'http://feed';
            const res = {
                ok: true,
                body: {
                    pipe: stub()
                }
            };
            const parser = {
                on: stub(),
                read: stub(),
                meta: null
            };
            parser.on.callsFake((event, cb) => {
                if (event === 'error') {
                    cb(error);
                }
            });
            parserMock.returns(parser);
            fetchMock.resolves(res);
            const error = {
                message: 'error'
            };
            try {
                await instance.parse(url);
            }catch (err) {
                expect(err).to.equal(error);
                return;
            }
            throw new Error('It didnt throw');
        });

        it('should resolve with the parsed stream', async function() {
            const url = 'http://feed';
            const res = {
                ok: true,
                body: {
                    pipe: stub()
                }
            };
            const parser = {
                on: stub(),
                read: stub(),
                meta: null
            };
            const item = {
                author: 'Author',
                date: 'Date',
                description: 'Description',
                title: 'Title',
                image: {
                    url: 'imageurl'
                },
                link: 'link'
            };
            parser.on.callsFake((event, cb) => {
                if (event === 'end') {
                    return setTimeout(() => cb(), 0); // eh
                }
                if (event === 'readable') {
                    return cb();
                }
            });
            parser.meta = {
                title: 'meta title',
                link: 'meta link',
                image: {
                    url: 'meta image url'
                },
                description: 'meta description',
                author: 'meta author'
            };
            parser.read
                .onFirstCall()
                .returns(item);
            parser.read.returns(null);
            parserMock.returns(parser);
            fetchMock.resolves(res);
            const expected = {
                meta: {
                    title: 'meta title',
                    link: 'meta link',
                    image: 'meta image url',
                    description: 'meta description',
                    author: 'meta author'
                },
                items: [
                    {
                        author: 'Author',
                        date: 'Date',
                        description: 'Description',
                        title: 'Title',
                        image: 'imageurl',
                        link: 'link'
                    }
                ]
            };
            const result = await instance.parse(url);
            expect(result).to.deep.equal(expected);
        });
    });
});
