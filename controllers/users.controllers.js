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
  if (req.cookies.jwt) res.cookie("jwt", "").redirect("/users/signin");
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
  User.findById(id)
    .exec()
    .then((user) => {
      if (!user || user.length)
        return res.status(404).json({ message: " user not found" });
      res.status(200).json({ user });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: " eror serveur side" });
    });
};
