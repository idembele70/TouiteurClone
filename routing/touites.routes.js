const router = require("express").Router();

const {
  getTouitesPage,
  addTouitesForm,
  updatesTouitesForm,
  addTouites,
  updatesTouites,
} = require("../controllers/touites.controllers");

//Routes

/* GET */
router.get("/", getTouitesPage);
router.get("/addTouites", addTouitesForm);
router.get("/updateTouites/:id", updatesTouitesForm);
/* POST */
router.post("/addTouites", addTouites);
/* PUT */
router.put("/updateTouites", updatesTouites);

module.exports = router;
