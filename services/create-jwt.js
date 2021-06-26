const { encode } = require("jwt-simple");
const moment = require("moment");
const {
  jwt: { secret },
} = require(`../environment/${process.env.NODE_ENV}`);
exports.createToken = (user) => {
  const payload = {
    ...user,
    sub: user._id,
    iat: moment().unix(),
    exp: moment().add(30, "days").unix(),
  };
  /* delete payload._id; */
  delete payload.password;

  return encode(payload, secret);
};
