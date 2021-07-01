const Touite = require("../database/models/touite.model");
const User = require("../database/models/user.model");
exports.getTouitesPage = async function (req, res) {
  const { _id } = req.user._doc;
 await User.findById(_id, function (err, user) {
    if (err) return console.error("get Touite page error : ", err);
    req.user._doc.avatar = user.avatar;
    req.user._doc.follow = user.follow;
  });
  const { username, email, avatar,follow } = req.user._doc;
  const information = `${username} (${email})`;
  Touite.find({})
    .exec()
    .then(async (touites) => {
      const touitesAdded = [];
      if (!touites.length) {
        return res.render("pages/touites", {
          signed: true,
          information,
          touitesAdded,
          username,
          avatar,
          id: _id,
          owner: true,
       
        });
      }

      touites.forEach(async ({ _id: id, message, from }, i) => {
        const user = await User.findOne({ username: from }).exec();
        touitesAdded.push({ id, message, from, avatar: user.avatar });
        if (i + 1 == touites.length)
          res.render("pages/touites", {
            signed: true,
            information,
            touitesAdded,
            username,
            owner: true,
            id: _id,
            avatar,
            nbFollower :follow.length
          });
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
  const { username: from } = req.user._doc;
  const touite = new Touite({ message, from });
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
