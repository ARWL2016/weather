if (process.NODE_ENV === 'development') {
  require('dotenv').config();
}

const express = require('express');
const path = require('path');
const rp = require('request-promise');
const compression = require('compression');
const helmet = require('helmet');

const app = express();
app.use(compression());
app.use(helmet());
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'dist')));

app.get('/weather/:location', (req, res) => {

  const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?';
  const APPID = process.env.APPID;

  const location = req.params.location;
  const url = `${baseUrl}q=${location}&APPID=${APPID}`;

  rp(url)
    .then(response => {
      res.send(response);
    })
    .catch(e => {
      console.log(e);
      res.status(500).send();
    });
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
})

app.listen(port, () => {
  console.log('Listening on port: ', port);
});

