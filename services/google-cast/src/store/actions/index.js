const application = require('./application');
const cast = require('./cast');
const media = require('./media');
const volume = require('./volume');

module.exports = Object.assign({}, cast, application, media, volume);
