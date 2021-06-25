const router = require("express").Router();

const { getTouitesPage } = require("../controllers/touites.controllers");

//check Authentification with cookies

//Routes
router.get("/",getTouitesPage);

module.exports = router;
