const router = require("express").Router();

const {
  getTouitesPage,
  addTouitesForm,
  addTouites,
} = require("../controllers/touites.controllers");

//check Authentification with cookies

//Routes

/* GET */
router.get("/", getTouitesPage);
router.get("/addTouites", addTouitesForm);

/* POST */
router.post("/addTouites", addTouites);

module.exports = router;
