const { combineReducers } = require('redux');

const config = require('./config');
const feeds = require('./feeds');
const items = require('./items');
const meta = require('./meta');

module.exports = combineReducers({
    config,
    feeds,
    items,
    meta
});
