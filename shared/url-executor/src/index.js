const d = require('debug')('url-executor');
const fetch = require('node-fetch');

async function multiple(urls) {
    await Promise.all(urls.map(url => execute(url)));
}

async function execute(target) {
    if (typeof target === 'string') {
        d(`GET: ${target}...`);
        const start = Date.now();
        const res = await fetch(target);
        const end = Date.now();
        d(`GET: ${target} - ${res.status} ${res.statusText} - ${end - start}ms`);
        return res;
    }else if (target instanceof Object) {
        const { url, options } = target;
        d(`${options.method || 'GET'}: ${url}...`);
        const start = Date.now();
        const res = await fetch(url, options);
        const end = Date.now();
        d(`${options.method || 'GET'}: ${url} - ${res.status} ${res.statusText} - ${end - start}ms`);
        return res;
    }
}

async function run(executor) {
    if (executor instanceof Array) {
        await multiple(executor);
    }else if (typeof executor === 'string' ||
        executor instanceof Object) {
        await execute(executor);
    }else {
        throw new Error('Invalid Argument', executor);
    }
}

module.exports = run;
