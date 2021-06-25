const Touite = require("../database/models/touite.model");

exports.getTouitesPage = function (req, res) {
  const { username, email } = req.user._doc;
  const information = `${username} (${email})`;
  res.render("pages/touites", {
    signed: true,
    information,
  });
};

exports.addTouitesForm = function (req, res) {
  res.render("pages/touite-form", {
    addTouite: true,
    signed: true,
  });
};

exports.addTouites = function (req, res) {
  const { message } = req.body;
  const { _id: userId } = req.user._doc;
  console.log(userId);
  const touite = new Touite({ message, userId });
  touite
    .save()
    .then(() => {
      console.log("Touite ajouté");
      res.redirect("/touites/");
    })
    .catch((e) => {
      console.error("Erreur lors de l'ajout du tweet");
      res.render("/pages/touite-form", {
        error: "Erreur lors de l'ajout du tweet ",
      });
    });
};
