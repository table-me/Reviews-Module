const express = require('express');
const bodyParser = require('body-parser');
const Restaurant = require('./database/Restaurant.js');
const path = require('path')

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// app.use('/restaurant/:id', express.static('/public/dist'));
app.use(express.static(__dirname + '/public/dist'));

app.get('/', (req, res) => {
  res.sendFile('index.html')
});

app.get('/restaurant/:id/reviews', (req, res) => {
  Restaurant.aggregate([
    {$match: {'id': 429}},
    {$unwind: '$reviews'},
    {$sort: {'reviews.createdAt': -1}}
  ], 
  (err, result) => {
    if (err) res.status(400).send('error getting reviews');
    const reviews = [];
    result.map(review => reviews.push(review.reviews))
    res.json(reviews)
  })
});

app.get('/restaurant/:id/filters', (req, res) => {
  Restaurant.find({'id': 429}, (err, result) => {
    if (err) res.status(400).send('error getting filtered keywords');
    res.json(result[0].filters);
  })
});

app.listen(port, () => console.log(`The port is listening on ${port}`));