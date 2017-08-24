const { NotFoundError } = require('restify-errors');
const { expect, use } = require('chai');
const { stub, match } = require('sinon');
const asPromised = require('chai-as-promised');
const sinonChai = require('sinon-chai');

use(asPromised);
use(sinonChai);

const requirePath = '../src/routes';
const routes = require(requirePath);

describe('routes', function() {
    it('should be a function', function() {
        expect(routes).to.be.an.instanceof(Function);
    });

    describe('should setup routes on the given server', function() {
        let server;
        let store;
        let res;

        beforeEach(function() {
            server = {
                get: stub()
            };
            store = {
                getState: stub()
            };
            res = {
                status: stub(),
                json: stub(),
                end: stub()
            };

            store.getState.returns({
                items: {
                    test: [
                        {
                            title: '#1'
                        }
                    ]
                },
                meta: {
                    test: {
                        title: 'test'
                    }
                },
                feeds: {
                    test: {
                        id: 'test'
                    }
                }
            });
        });

        describe('GET /feeds', function() {
            it('should register the route', function() {
                routes(server, store);
                expect(server.get).to.have.been.calledWith('/feeds', match.func);
            });

            it('should return all feeds', function(done) {
                const result = {
                    test: {
                        meta: {
                            title: 'test'
                        },
                        items: [
                            {
                                title: '#1'
                            }
                        ]
                    }
                };

                server.get.callsFake((route, cb) => {
                    if (route === '/feeds') {
                        cb(null, res);
                        expect(store.getState).to.have.been.called;
                        expect(res.status).to.have.been.calledWith(200);
                        expect(res.json).to.have.been.calledWith(result);
                        expect(res.end).to.have.been.called;
                        done();
                    }
                });
                routes(server, store);
            });
        });

        describe('GET /feeds/:id', function() {
            it('should register the route', function() {
                routes(server, store);
                expect(server.get).to.have.been.calledWith('/feeds/:id', match.func);
            });

            it('should return a NotFoundError when called with an invalid id', function(done) {
                const req = {
                    params: {
                        id: 'test2'
                    }
                };
                const next = stub();

                server.get.callsFake((route, cb) => {
                    if (route === '/feeds/:id') {
                        cb(req, res, next);
                        expect(store.getState).to.have.been.called;
                        expect(res.status).not.to.have.been.called;
                        expect(res.json).not.to.have.been.called;
                        expect(res.end).not.to.have.been.called;
                        expect(next).to.have.been.calledWith(match.instanceOf(NotFoundError));
                        done();
                    }
                });
                routes(server, store);
            });

            it('should return the specified feed', function(done) {
                const result = {
                    meta: {
                        title: 'test'
                    },
                    items: [
                        {
                            title: '#1'
                        }
                    ]
                };

                const req = {
                    params: {
                        id: 'test'
                    }
                };

                server.get.callsFake((route, cb) => {
                    if (route === '/feeds/:id') {
                        cb(req, res);
                        expect(store.getState).to.have.been.called;
                        expect(res.status).to.have.been.calledWith(200);
                        expect(res.json).to.have.been.calledWith(result);
                        expect(res.end).to.have.been.called;
                        done();
                    }
                });
                routes(server, store);
            });
        });

        describe('GET /feeds/:id/meta', function() {
            it('should register the route', function() {
                routes(server, store);
                expect(server.get).to.have.been.calledWith('/feeds/:id/meta', match.func);
            });

            it('should return a NotFoundError when called with an invalid id', function(done) {
                const req = {
                    params: {
                        id: 'test2'
                    }
                };
                const next = stub();

                server.get.callsFake((route, cb) => {
                    if (route === '/feeds/:id/meta') {
                        cb(req, res, next);
                        expect(store.getState).to.have.been.called;
                        expect(res.status).not.to.have.been.called;
                        expect(res.json).not.to.have.been.called;
                        expect(res.end).not.to.have.been.called;
                        expect(next).to.have.been.calledWith(match.instanceOf(NotFoundError));
                        done();
                    }
                });
                routes(server, store);
            });

            it('should return the specified feed', function(done) {
                const result = {
                    title: 'test'
                };

                const req = {
                    params: {
                        id: 'test'
                    }
                };

                server.get.callsFake((route, cb) => {
                    if (route === '/feeds/:id/meta') {
                        cb(req, res);
                        expect(store.getState).to.have.been.called;
                        expect(res.status).to.have.been.calledWith(200);
                        expect(res.json).to.have.been.calledWith(result);
                        expect(res.end).to.have.been.called;
                        done();
                    }
                });
                routes(server, store);
            });
        });

        describe('GET /feeds/:id/items', function() {
            it('should register the route', function() {
                routes(server, store);
                expect(server.get).to.have.been.calledWith('/feeds/:id/items', match.func);
            });

            it('should return a NotFoundError when called with an invalid id', function(done) {
                const req = {
                    params: {
                        id: 'test2'
                    }
                };
                const next = stub();

                server.get.callsFake((route, cb) => {
                    if (route === '/feeds/:id/items') {
                        cb(req, res, next);
                        expect(store.getState).to.have.been.called;
                        expect(res.status).not.to.have.been.called;
                        expect(res.json).not.to.have.been.called;
                        expect(res.end).not.to.have.been.called;
                        expect(next).to.have.been.calledWith(match.instanceOf(NotFoundError));
                        done();
                    }
                });
                routes(server, store);
            });

            it('should return the specified feed', function(done) {
                const result = [
                    {
                        title: '#1'
                    }
                ];

                const req = {
                    params: {
                        id: 'test'
                    }
                };

                server.get.callsFake((route, cb) => {
                    if (route === '/feeds/:id/items') {
                        cb(req, res);
                        expect(store.getState).to.have.been.called;
                        expect(res.status).to.have.been.calledWith(200);
                        expect(res.json).to.have.been.calledWith(result);
                        expect(res.end).to.have.been.called;
                        done();
                    }
                });
                routes(server, store);
            });
        });
    });
});
