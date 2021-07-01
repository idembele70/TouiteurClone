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
      console.log("getting all users !");
      return res.status(200).json({ users });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "error server side" });
    });
};

//A faire :  lorsque on follow le button follow change de label
exports.getOneUser = function (req, res) {
  const { id } = req.params;
  const touitesAdded = [];
  User.findById(id)
    .exec()
    .then(async (user) => {
      const { username, email, avatar } = user;
      const information = `${username} (${email})`;
      const { _id } = req.user._doc;
      const reqUser = await User.findById(_id);
      console.log(reqUser);
      const touites = await touite.find({ from: username });
      for (const touite of touites) {
        const { _id: id, from, message } = touite;
        touitesAdded.push({ id, from, message, avatar });
      }
      if (touitesAdded[0])
        if (!user || user.length)
          return res.status(404).json({ message: " user not found" });
      res.status(200).render("pages/touites", {
        touitesAdded,
        information,
        touitesLength: touitesAdded.length,
        owner: _id == id,
        signed: true,
        following: reqUser.follow.includes(username),
        id,
        avatar,
        nbFollower: user.follow.length,
      });
    })
    .catch((error) => {
      console.error("erreur sur getOneUser :", error);
      res.status(500).json({ message: " eror serveur side" });
    });
};

exports.folowOneUser = async function (req, res) {
  const { id } = req.params;
  const { _id: reqUserId } = req.user._doc;
  const user = await User.findOne({ _id: reqUserId });
  const followed = await User.findById(id);
  const newFollow = [...user.follow];
  if (!newFollow.includes(followed.username)) newFollow.push(followed.username);
  else newFollow.splice(followed.username, 1);
  console.log(newFollow);
  await User.updateOne({ _id: reqUserId }, { follow: newFollow });
};

exports.changePicture = function (req, res) {
  const { id } = req.params;
  const avatar = req.newName;
  User.findByIdAndUpdate(id, { avatar }, (err) => {
    if (err) return console.error("Error changePicture controller : ", err);
    console.log("New picture added to DB");
  });
  res.redirect("/");
};

