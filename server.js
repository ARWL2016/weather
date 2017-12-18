const express = require('express');
const path = require('path');
const rp = require('request-promise');

const app = express();
const port = process.env.PORT || 4200;

app.use(express.static(path.join(__dirname, 'dist')));

app.get('/weather/:location', (req, res) => {

  const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?';
  const APPID = 'ba02317420a71b482c575129ae75f584';

  const location = req.params.location;
  const url = `${baseUrl}q=${location}&APPID=${APPID}`;
  console.log(req.params.location);

  rp(url)
    .then(response => {
      console.log(response);
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

