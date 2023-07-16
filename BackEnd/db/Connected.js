const mongoose = require("mongoose");

const connect = mongoose.connect(
  "mongodb+srv://chiku:singh@cluster0.nqil3pv.mongodb.net/fullStackApp?retryWrites=true&w=majority"
);

module.exports = { connect };
