const {
  signUpForm,
  signInForm,
  signUp,
  signIn,
  signOut,
  getAllUsers,
  getOneUser,
  folowOneUser
} = require("../controllers/users.controllers");
const { checkAuth } = require("../middlewares/check-auth");

const router = require("express").Router();

//SIGN
//GET

router.get("/signup", signUpForm);
router.get("/signin", signInForm);
router.get("/signout", signOut);

//POST
router.post("/signup", signUp);
router.post("/signin", signIn);

//GET
router.get("/", checkAuth, getAllUsers);
router.get("/:id", checkAuth, getOneUser);

// PUT
router.get('/follow/:id',checkAuth,folowOneUser)

module.exports = router;
