const { decode } = require("jwt-simple");
const moment = require("moment");
const {
  jwt: { secret },
} = require(`../environment/${process.env.NODE_ENV}`);
exports.checkAuth = function (req, res, next) {
  if (!req.cookies.jwt) {
    console.log("acces not allowed");
    return res.redirect("/users/signin");
  }
  const token = req.cookies.jwt;
  try {
    const payload = decode(token, secret);
    if (payload && payload.exp <= moment().unix()) {
      console.log("token expired");
      res.redirect("/users/signin");
    } else if (payload) {
      req.user = payload;
      next();
    } else {
      console.log("no valid token");
      res.redirect("/users/signin");
    }
  } catch (error) {
    console.log("cannot decode token");
    res.redirect("/users/signin");
  }
};
