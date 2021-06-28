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
      touites.forEach(({ _id, message, userId }) =>
        touitesAdded.push({ id: _id, message, userId })
      );
      const owner = _id == touitesAdded[0].userId;
      console.log(owner);
      res.render("pages/touites", {
        signed: true,
        information,
        touitesLength,
        touitesAdded,
        username,
        owner,
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
  const { id: _id } = req.params;

  Touite.findById({ _id })
    .exec()
    .then((touite) => {
      res.render("pages/touite-form", {
        addTouite: false,
        signed: true,
        _id,
        message: touite.message,
      });
    })
    .catch((e) => {
      console.error("error : " + e);
      res.redirect("/");
    });
};

exports.updatesTouites = function (req, res) {
  const { id: _id } = req.params;
  const { message } = req.body;
  Touite.findByIdAndUpdate({ _id }, { message }, (err) => {
    if (err) return console.error(err);
    console.log("success");
    res.redirect("/");
  });
};

exports.deleteTouites = function (req, res) {
  const { id: _id } = req.params;
  Touite.findByIdAndDelete({ _id })
    .exec()
    .then(() => {
      console.log("Touite delete");
      return res.redirect("/");
    })
    .catch(console.error);
};
