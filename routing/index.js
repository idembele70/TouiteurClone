const router = require("express").Router();
const usersRouter = require("./users.routes");

router.use("/api/users", usersRouter);

module.exports = router;
