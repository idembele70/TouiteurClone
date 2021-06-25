const {
  signUpForm,
  signInForm,
  signUp,
  signIn,
  signOut,
  getAllUsers,
  getOneUser,
} = require("../controllers/users.controllers");

const router = require("express").Router();

//SIGN
  //GET

router.get("/signup", signUpForm);
router.get("/signin", signInForm);
router.get("/signout", signOut);

  //POST
router.post("/signup", signUp);
router.post("/signin", signIn);

router.get("/", getAllUsers);
router.get("/:id", getOneUser);

module.exports = router;
