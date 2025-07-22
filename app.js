const express = require("express");
const app = express();
const router = require("./routing");
const { resolve } = require("path");
const cookieParser = require("cookie-parser");
const methodOverride = require("method-override");
require("./database");
const { ports } = require(`./environment/${process.env.NODE_ENV}`);

//configuration
app.set("views", resolve("views"));
app.set("view engine", "pug");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/static", express.static(resolve("public")));
app.use(cookieParser());
app.use(methodOverride("_method"));
app.use(router);

app.listen(ports, (err) => {
  if(err){
    console.error(`Error encoutered during listening to port`, err);
    return;
  }  
  console.log(`Listening on port: ${ports}`)
})

module.exports = app;
