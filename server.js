const express = require('express');
const bodyParser = require('body-parser');
const Restaurant = require('./database/Restaurant.js');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public/dist'));

app.get('/', (req, res) => {
  res.sendFile('index.html')
});

app.get('/reviews/232', (req, res) => {
  Restaurant.find((err, reviews) => {
    if (err) throw err;
    console.log(reviews)
    res.send(reviews);
  });
});

app.listen(port, () => console.log(`The port is listening on ${port}`));