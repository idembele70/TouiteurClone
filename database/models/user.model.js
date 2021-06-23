const { Schema, model } = require("mongoose");

const userSchema = Schema({
  username: String,
  email: String,
  password: String,
});

module.exports = model("users", userSchema);
