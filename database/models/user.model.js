const { Schema, model } = require("mongoose");

const userSchema = Schema({
  username: String,
  email: String,
  password: String,
});

exports.User =  model("users", userSchema);
