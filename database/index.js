const mongoose = require('mongoose');
const db = mongoose.connect('mongodb://localhost/reviews', {useNewUrlParser: true});

module.exports = db;