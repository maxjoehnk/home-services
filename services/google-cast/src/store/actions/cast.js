const CAST_ONLINE = '[Device] Online';
const CAST_OFFLINE = '[Device] Offline';

const castOnline = service => ({
    type: CAST_ONLINE,
    payload: {
        name: service.txtRecord.fn,
        service
    }
});

const castOffline = service => ({
    type: CAST_OFFLINE,
    payload: service.txtRecord.fn
});

module.exports = {
    CAST_ONLINE,
    CAST_OFFLINE,
    castOnline,
    castOffline
};
