'use strict'

const express = require('express');
const bodyParser = require('body-parser');

const user = require('./routes/user');
const event = require('./routes/event');

const app = express();

if (app.get('env') == 'development') {
  require('dotenv').config();
}

app.set('port', (process.env.PORT || 3600));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/user', user);
app.use('/event', event);

app.get('/', (req, res) => {
  return res.status(200).send('Mitman Backend');
});

app.listen(app.get('port'), () => {
  console.log('Hello Human!')
  console.log('Mitman Server is running on port', app.get('port'));
});