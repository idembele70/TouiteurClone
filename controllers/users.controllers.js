const Users = require("../database/models/user.model");

exports.getAllUsers = function (req, res) {
  Users.find()
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
  Users.findById(id)
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
