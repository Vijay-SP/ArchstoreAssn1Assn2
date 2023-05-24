const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

// Enable CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.post('/', (req, res) => {
  const payload = req.body;
  const words = payload.str.split(' ');

  if (words.length >= 8) {
    res.status(200).send('OK'); // Return 200 OK if at least 8 words
  } else {
    res.status(406).send('Not Acceptable'); // Return Not Acceptable if not 8 words
  }
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});

