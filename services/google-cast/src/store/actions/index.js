const application = require('./application');
const cast = require('./cast');
const volume = require('./volume');

module.exports = Object.assign({}, cast, application, volume);
