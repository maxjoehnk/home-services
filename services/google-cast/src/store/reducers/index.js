const { combineReducers } = require('redux');
const devices = require('./devices');
const volume = require('./volume');
const applications = require('./applications');

module.exports = combineReducers({
    applications,
    devices,
    volume
});
