const mdns = require('mdns');
const logger = require('./logger');
const {
    castOnline,
    castOffline
} = require('./store/actions');

module.exports = store => {
    const connect = service => {

    };

    const setup = () => {
        const resolverSequence = [
            mdns.rst.DNSServiceResolve(),          // eslint-disable-line new-cap
            'DNSServiceGetAddrInfo' in mdns.dns_sd ?
                mdns.rst.DNSServiceGetAddrInfo() : // eslint-disable-line new-cap
                mdns.rst.getaddrinfo({ families: [4] }),
            mdns.rst.makeAddressesUnique()
        ];
        const browser = mdns.createBrowser(mdns.tcp('googlecast'), {
            resolverSequence
        });
        browser.on('serviceUp', service => {
            logger.debug(`Found ${service.txtRecord.fn}`, service);
            store.dispatch(castOnline(service));
            connect(service);
        });
        browser.on('serviceDown', service => {
            store.dispatch(castOffline(service));
        });
        browser.start();
    };

    setup();
};
