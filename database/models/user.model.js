const { hashSync, compareSync } = require("bcrypt");
const { Schema, model } = require("mongoose");
const { hashRounds } = require(`../../environment/${process.env.NODE_ENV}`);

const userSchema = Schema({
  username: String,
  email: String,
  password: String,
  Touites: Number,
  Follow: Number,
});
userSchema.statics.hashPassword = (password) => hashSync(password, hashRounds);
userSchema.methods.checkPassword = function (password) {
  return compareSync(password, this.password);
};
const User = model("users", userSchema);
module.exports = User;
