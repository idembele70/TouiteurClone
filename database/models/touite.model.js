const { Schema, model } = require("mongoose");

const touiteSchema = Schema({
  message: String,
  userId: String,
});

const touite = model("touites", touiteSchema);
module.exports = touite;
