const mongoose = require("mongoose");
mongoose.connect("mongodb://3.14.151.226/reviews", { useNewUrlParser: true });
const db = mongoose.connection;

module.exports = db;
