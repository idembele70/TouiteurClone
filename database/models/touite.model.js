const { Schema, model } = require("mongoose");

const touiteSchema = Schema({
  message: String,
  from: String,
});

const touite = model("touites", touiteSchema);
module.exports = touite;
