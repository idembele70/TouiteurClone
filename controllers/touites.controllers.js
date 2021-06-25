exports.getTouitesPage = function (req, res) {
  const { username, email } = req.user._doc;
  const information = `${username} (${email})`;
  res.render("pages/touites", {
    signed: true,
    information
  });
};
