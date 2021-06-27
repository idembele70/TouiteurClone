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
router.get("/deleteTouites/:id", deleteTouites);
router.delete("/deleteTouites/:id", deleteTouites);
/* POST */
router.post("/addTouites", addTouites);
/* PUT */
/* router.put("/updateTouites/:id", updatesTouites); */

module.exports = router;
