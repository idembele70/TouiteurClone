const Touite = require("../database/models/touite.model");
const url = require("url");
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
  const newMessage = new URL("https://example.org" + req.url).searchParams.get(
    "message"
  );

  Touite.findOneAndUpdate({ userId, _id }, { message: newMessage })
    .exec()
    .then(({ message }) => {
      if (newMessage) return res.redirect("/");
      res.render("pages/touite-form", {
        addTouite: false,
        signed: true,
        message: newMessage || message,
        _id,
      });
    })
    .catch((e) => {
      console.error(e);
      res.redirect("/");
    });
};

exports.deleteTouites = function (req, res) {
  const { _id: userId } = req.user._doc;
  const { id: _id } = req.params;
  
  Touite.findByIdAndDelete({ _id, userId })
    .exec()
    .then(() => {
      console.log("Touite delete");
       return res.redirect("/");
    })
    .catch(console.error);
};

// DEBUT : J'ai pas reussi a le faire fonctionner donc j'ai bricolé avec le get !
exports.updatesTouites = function (req, res) {
  console.log(req.params);
  res.send("ok");
};
// END
