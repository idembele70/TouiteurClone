const router = require("express").Router();

const {
  getTouitesPage,
  addTouitesForm,
  updatesTouitesForm,
  addTouites,
  updatesTouites,
  deleteTouites,
} = require("../controllers/touites.controllers");

//Routes

/* GET */
router.get("/", getTouitesPage);
router.get("/addTouites", addTouitesForm);
router.get("/updateTouites/:id", updatesTouitesForm);

/* POST */
router.post("/addTouites", addTouites);

/* DELETE */
router.delete("/deleteTouites/:id", deleteTouites);

/* PUT */
router.put("/updateTouites/:id", updatesTouites);

module.exports = router;
