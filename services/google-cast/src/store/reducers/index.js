const { combineReducers } = require('redux');
const devices = require('./devices');
const volume = require('./volume');
const applications = require('./applications');
const media = require('./media');

module.exports = combineReducers({
    applications,
    devices,
    volume,
    media
});
