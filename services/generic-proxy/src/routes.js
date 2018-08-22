// @flow
/*:: import { type Context, type Middleware } from 'koa';*/
/*:: import { type Routes } from './types';*/
const minimatch = require('minimatch');
const fetch = require('node-fetch');

function setupRoutes(routes /* :Routes */) /* :Middleware */ {
    return async(ctx /* :Context */) => {
        const match /* :string | void */ = Object.getOwnPropertyNames(routes)
            .sort((a, b) => b.length - a.length)
            .find((route) => minimatch(ctx.path, route));
        if (match === undefined) {
            ctx.status = 404;
            return;
        }
        const route = routes[match];
        const result = await fetch(route.url);
        ctx.set(result.headers.raw());
        ctx.status = result.status;
        ctx.body = result.body;
    };
}

module.exports = {
    setupRoutes
};
