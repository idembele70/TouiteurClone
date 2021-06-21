const mongoose = require("mongoose");
const {
  db: { protocol, user, password, host, name, options },
} = require(`../environment/${process.env.NODE_ENV}`);
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);
mongoose
  .connect(`${protocol}://${user}:${password}@${host}/${name}?${options}`)
  .then(() => console.log("connected to db."));
