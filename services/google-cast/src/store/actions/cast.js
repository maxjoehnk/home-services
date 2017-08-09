const CAST_ONLINE = '[Device] Online';
const CAST_OFFLINE = '[Device] Offline';
const CAST_STATUS = '[Device] Status';

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

const castStatus = (device, status) => ({
    type: CAST_STATUS,
    payload: {
        device,
        status
    }
});

module.exports = {
    CAST_ONLINE,
    CAST_OFFLINE,
    CAST_STATUS,
    castOnline,
    castOffline,
    castStatus
};
