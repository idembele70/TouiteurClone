const express = require("express");
const app = express();
const router = require("./routing");
require('./database');
app.use(router);

module.exports = app;
