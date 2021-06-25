const express = require("express");
const app = express();
const router = require("./routing");
const { resolve } = require("path");
const cookieParser = require("cookie-parser");
require("./database");

//configuration
app.set("views", resolve("views"));
app.set("view engine", "pug");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/static", express.static(resolve("public")));
app.use(cookieParser());
app.use(router);

module.exports = app;
