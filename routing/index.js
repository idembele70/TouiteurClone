const router = require("express").Router();
const usersRouter = require("./users.routes");
const touitesRouter = require("./touites.routes");
const { checkAuth } = require("../middlewares/check-auth");

router.use("/touites", checkAuth, touitesRouter);
router.use("/users", usersRouter);

router.get("/", (req, res) => res.redirect("/touites"));

module.exports = router;