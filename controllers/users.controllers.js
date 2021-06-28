const touite = require("../database/models/touite.model");
const User = require("../database/models/user.model");
const { createToken } = require("../services/create-jwt");

exports.signUpForm = function (req, res) {
  res.status(200).render("pages/user-form", { signup: true });
};
exports.signInForm = function (req, res) {
  res.status(200).render("pages/user-form", { signup: false });
};

exports.signUp = function (req, res) {
  const { username, email, password } = req.body;
  const hashedPassword = User.hashPassword(password);
  User.find({ username, email })
    .exec()
    .then((newUser) => {
      if (newUser.length) {
        return res.render("pages/user-form", {
          signup: true,
          errors: ["le nom d'utilisateur ou l'email est dèjà utiliser"],
        });
      }
      const user = new User({ username, email, password: hashedPassword });
      user
        .save()
        .then(() => {
          console.log("sucessfull");
          return res.redirect("/users/signin");
        })
        .catch((error) => {
          console.error(error);
          return res.render("pages/user-form", {
            signup: true,
            errors: [error.message],
          });
        });
    })
    .catch((e) => console.error("erreur lors de la connexion"));
};

exports.signIn = function (req, res) {
  const { email, password } = req.body;
  User.findOne({ email })
    .exec()
    .then((user) => {
      if (!user)
        return res.render("pages/user-form", {
          errors: ["Mot de passe incorrecte"],
        });
      else if (user.checkPassword(password)) {
        const token = createToken(user);
        res.cookie("jwt", token, {
          secure: true,
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24 * 30,
        });
        return res.redirect("/");
      }
    })
    .catch((error) => {
      console.error(error);
      return { message: "Utilisateur introuvable" };
    });
};

exports.signOut = function (req, res) {
  if (req.cookies.jwt) res.cookie("jwt", Date.now()).redirect("/users/signin");
};

exports.getHomePage = function (req, res) {
  res.status(200).render("pages/touites");
};

exports.getAllUsers = function (req, res) {
  User.find()
    .exec()
    .then((users) => {
      if (!users || !users.length) {
        return res.status(404).json({ message: "users not found" });
      }
      res.status(200).json({ users });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "error server side" });
    });
};

exports.getOneUser = function (req, res) {
  const { id } = req.params;
  const touitesAdded = [];
  const information = ``;
  touite
    .find({ userId: id })
    .exec()
    .then((touites) => touites.forEach((t) => touitesAdded.push(t)))
    .catch(console.error);
  User.findById(id)
    .exec()
    .then((user) => {
      const { username, email, follow } = user;
      const information = `${username} (${email})`;
      const { _id } = req.user._doc;
      const following = follow.includes(_id);
      console.log("follow : " + follow);
      const owner = _id == touitesAdded[0].userId;
      if (!user || user.length)
        return res.status(404).json({ message: " user not found" });
      res.status(200).render("pages/touites", {
        touitesAdded,
        information,
        touitesLength: touitesAdded.length,
        owner,
        signed: true,
        following,
      });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: " eror serveur side" });
    });
};

exports.folowOneUser = async function (req, res) {
  const { id } = req.params;
  const { _id: reqUserId } = req.user._doc;
  const user = await User.findOne({ _id: id });
  const newFollow = [...user.follow];
  if (!newFollow.includes(reqUserId)) newFollow.push(reqUserId);
  else newFollow.splice(reqUserId, 1);
  console.log("newFollow" + newFollow);
  const userUpdated = await User.updateOne({ _id: id }, { follow: newFollow });
};
