const { getAllUsers, getOneUser } = require("../controllers/users.controllers");

const router = require("express").Router();

router.get("/", getAllUsers);
router.get("/:id", getOneUser);

module.exports = router;
