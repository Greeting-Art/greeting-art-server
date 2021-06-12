const express = require('express');
var cors = require('cors');
const app = express();

app.use(express.json());

app.use('/send', cors(), require('./controllers/sendGrid'))

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
