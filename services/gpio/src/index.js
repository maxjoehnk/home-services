const fs = require('fs');
const { resolve } = require('path');
const { promisify } = require('util');
const { safeLoad } = require('js-yaml');
const wpi = require('wiring-pi');
const { createServer, plugins } = require('restify');
const { createLogger } = require('bunyan');
const fetch = require('node-fetch');
const tinycolor2 = require('tinycolor2');

const readFile = promisify(fs.readFile);

const logger = createLogger({
    name: 'gpio-service'
});

async function start(args) {
    try {
        const options = defaultOptions(args);
        logger.level(options.logLevel);
        const config = await loadConfig(options.config);
        wpi.setup(config.numbering);
        setupInterrupts(config);
        const outputs = setupOutputs(config);
        const server = createServer();
        setupServer(server, config, outputs);
        server.listen(config.port, () => {
            logger.info(`Listening on Port ${config.port}`);
        });
    }catch (err) {
        logger.fatal(err);
    }
}

function setupInterrupts({ interrupts }) {
    interrupts.forEach(interrupt => {
        wpi.pinMode(interrupt.pin, wpi.INPUT);
        let pud;
        switch (interrupt.pud) {
            case 'UP':
                pud = wpi.PUD_UP;
                break;
            case 'DOWN':
                pud = wpi.PUD_DOWN;
                break;
            default:
                logger.warn(`Invalid PUD configuration for pin ${interrupt.pin}: ${interrupt.pud}. Defaulting to 'OFF'`);
            case 'OFF':
                pud = wpi.PUD_OFF;
                break;
        }
        wpi.pullUpDnControl(interrupt.pin, pud);
        let edge;
        switch (interrupt.edge) {
            case 'FALLING':
                edge = wpi.INT_EDGE_FALLING;
                break;
            case 'RISING':
                edge = wpi.INT_EDGE_RISING;
                break;
            case 'BOTH':
                edge = wpi.INT_EDGE_BOTH;
                break;
            default:
                logger.warn(`Invalid Edge configuration for pin ${interrupt.pin}: ${interrupt.edge}`);
                edge = wpi.INT_EDGE_SETUP;
                break;
        }
        wpi.wiringPiISR(interrupt.pin, edge, () => {
            logger.debug(`Interrupt for Pin ${interrupt.pin} triggered`);
            interrupt.urls.forEach(url => {
                logger.debug(`Fetching ${url}`);
                fetch(url)
                    .then(res => logger.debug(`GET: ${url} - ${res.status} ${res.statusText}`))
                    .catch(err => logger.error(err));
            });
        });
    });
}

function setupOutputs(config) {
    const outputs = {};
    config.outputs.forEach(outputConfig => {
        const output = {};
        switch (outputConfig.mode) {
            case 'rgb': {
                const { r, g, b } = outputConfig.pins;
                wpi.pinMode(r, wpi.SOFT_PWM_OUTPUT);
                wpi.pinMode(g, wpi.SOFT_PWM_OUTPUT);
                wpi.pinMode(b, wpi.SOFT_PWM_OUTPUT);
                wpi.softPwmCreate(r, 0, 255);
                wpi.softPwmCreate(g, 0, 255);
                wpi.softPwmCreate(b, 0, 255);
                output.value = { r: 0, g: 0, b: 0 };
                output.set = value => {
                    const color = tinycolor2(value);
                    if (!color.isValid()) {
                        logger.warn(`Invalid Color ${value}`);
                        return;
                    }
                    output.value = color.toRgb();
                    output.write();
                };
                output.toggle = () => {
                    if (output.lastValue) {
                        output.value = output.lastValue;
                    }else {
                        output.lastValue = output.value;
                        output.value = {
                            r: 0,
                            g: 0,
                            b: 0
                        };
                    }
                    output.write();
                };
                output.write = () => {
                    wpi.softPwmWrite(r, output.value.r);
                    wpi.softPwmWrite(g, output.value.g);
                    wpi.softPwmWrite(b, output.value.b);
                };
                break;
            }
            case 'digital': {
                const { pin } = outputConfig;
                wpi.pinMode(pin, wpi.OUTPUT);
                output.value = false;
                output.set = value => {
                    if (output.value === !!value) {
                        return;
                    }
                    output.value = !!value;
                    output.write();
                };
                output.toggle = () => {
                    output.value = !output.value;
                    output.write();
                };
                output.write = () => {
                    wpi.digitalWrite(pin, output.value ? wpi.HIGH : wpi.LOW);
                };
                break;
            }
            case 'pwm': {
                const { pin } = outputConfig;
                wpi.pinMode(pin, wpi.SOFT_PWM_OUTPUT);
                wpi.softPwmCreate(pin, 0, 255);
                output.value = 0;
                output.set = value => {
                    if (value > 255 || value < 0) {
                        logger.warn(`Invalid PWM Value ${value} for Pin ${pin}`);
                        return;
                    }
                    if (output.value === value) {
                        return;
                    }
                    output.value = value;
                    output.write();
                };
                output.toggle = () => {
                    if (output.lastValue) {
                        output.value = output.lastValue;
                    }else {
                        output.lastValue = output.value;
                        output.value = 0;
                    }
                    output.write();
                };
                output.write = () => {
                    wpi.softPwmWrite(pin, output.value);
                };
                break;
            }
        }
        outputs[outputConfig.name] = output;
    });
    return outputs;
}

function setupServer(server, { endpoints }, outputs) {
    endpoints.forEach((endpoint) => {
        server.get(endpoint.url, (req, res, next) => {
            const output = outputs[endpoint.name];
            if (endpoint.mode === 'set') {
                output.set(endpoint.value);
            }else if (endpoint.mode === 'toggle') {
                output.toggle();
            }else {
                logger.warn(`Invalid Endpoint Mode ${endpoint.mode} for endpoint ${endpoint.url}`);
            }
        });
    });
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
        numbering: 'wpi',
        interrupts: [],
        endpoints: [],
        outputs: []
    };
    return Object.assign({}, defaults, config);
}

async function loadConfig(path) {
    const file = await readFile(path, 'utf8');
    const config = safeLoad(file); //TODO: Validate result
    return defaultConfig(config);
}

module.exports = {
    start
};
