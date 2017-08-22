const { combineReducers } = require('redux');

const feeds = require('./feeds');
const items = require('./items');
const meta = require('./meta');

module.exports = combineReducers({
    feeds,
    items,
    meta
});
