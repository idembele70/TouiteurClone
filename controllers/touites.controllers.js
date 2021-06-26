const Touite = require("../database/models/touite.model");

exports.getTouitesPage = function (req, res) {
  const { username, email, _id } = req.user._doc;
  const information = `${username} (${email})`;
  Touite.find({ userId: _id })
    .exec()
    .then((touites) => {
      const touitesLength = touites.length || 0;
      const touitesAdded = [] || 0;
      if (!touites.length)
        return res.render("pages/touites", {
          signed: true,
          information,
          touitesLength,
          touitesAdded,
          username,
        });
      touites.forEach(({ _id, message }) =>
        touitesAdded.push({ id: _id, message })
      );
      res.render("pages/touites", {
        signed: true,
        information,
        touitesLength,
        touitesAdded,
        username,
      });
    })
    .catch((e) => {
      console.error(e);
      res.redirect("/touites");
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

exports.updatesTouitesForm = function (req, res) {
  const { _id: userId } = req.user._doc;
  const { id: _id } = req.params;
  Touite.findOne({ userId, _id })
    .exec()
    .then(({ message }) => {
      res.render("pages/touite-form", {
        addTouite: false,
        signed: true,
        message,
      });
    })
    .catch((e) => {
      console.error(e);
      res.redirect("/");
    });
};
exports.updatesTouites = function (req, res) {
  const { id: _id } = req.params;
  console.log("updated");
  res.send("update worked");
};
