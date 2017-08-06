const express = require('express');
const app = express();
const api = require('./api');

app.use('/_api', api);
app.listen(8080, () => console.log('listening'));
