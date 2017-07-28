const fs = require('fs');
const { resolve } = require('path');
const { promisify } = require('util');
const { safeLoad } = require('js-yaml');
const { exec } = require('child_process');
const { createServer, plugins } = require('restify');
const logger = require('./logger');

const readFile = promisify(fs.readFile);

async function start(args) {
    try {
        const options = defaultOptions(args);
        logger.level(options.logLevel);
        const config = await loadConfig(options.config);
        const server = createServer();
        setupServer(server, config);
        server.listen(config.port, () => {
            logger.info(`Listening on Port ${config.port}`);
        });
    }catch (err) {
        logger.fatal(err);
    }
}

function setupServer(server, config) {
    server.use(plugins.queryParser({
        mapParams: true
    }));
    const { internal, custom } = config.endpoints;
    if (internal.exec) {
        server.get('/internal/exec/:cmd', handleExec);
        server.get('/internal/exec',
            expectQuery({
                cmd: 'string'
            }),
            handleExec);
    }
    if (internal.standby) {
        server.get('/internal/standby/:target', handleStandby);
        server.get('/internal/standby',
            expectQuery({
                target: 'string'
            }),
            handleStandby
        );
    }
    custom.forEach(({ url, cmd }) => {
        server.get(url, async(req, res, next) => {
            try {
                const result = await cec(cmd);
                res.send(200, result);
            }catch (err) {
                next(err);
            }
        });
    });
}

async function handleExec(req, res, next) {
    try {
        const result = await cec(req.params.cmd);
        res.send(200, result);
    }catch (err) {
        next(err);
    }
}

async function handleStandby(req, res, next) {
    try {
        const result = await cec(`standby ${req.params.target}`);
        res.send(200, result);
    }catch (err) {
        next(err);
    }
}

function expectQuery(query) {
    const params = Object.getOwnPropertyNames(query);
    return function(req, res, next) {
        for (let i = 0; i < params.length; i++) {
            const param = params[i];
            const type = query[param];
            if (!req.query.hasOwnProperty(param)) {
                res.send(400, {
                    msg: `Missing Query Parameter ${param}`
                });
                return;
            }
            if (typeof req.query[param] !== type) {
                res.send(400, {
                    msg: `Param ${param} is of type ${typeof req.query[param]}. Expected ${type}.`
                });
                return;
            }
        }
        return next();
    };
}

function defaultOptions(options) {
    const defaults = {
        config: resolve(__dirname, '../config.yml'),
        logLevel: 'warn'
    };
    return Object.assign({}, defaults, options);
}

function defaultConfig(config) {
    const defaults = {
        port: 8080,
        endpoints: {
            internal: {
                exec: false,
                standby: true
            },
            custom: []
        }
    };
    return Object.assign({}, defaults, config);
}

async function loadConfig(path) {
    const file = await readFile(path, 'utf8');
    const config = safeLoad(file); //TODO: Validate result
    return defaultConfig(config);
}

function cec(cmd) {
    return new Promise((resolve, reject) => {
        logger.debug(`Executing CEC Command '${cmd}'`);
        exec(`echo "${cmd}" | cec-client -s`, (err, stdout) => {
            if (err) {
                logger.error(err);
                return reject(err);
            }
            return resolve(stdout);
        });
    });
}

module.exports = {
    start
};
