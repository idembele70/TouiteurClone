const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets/profile-picture/");
  },
  filename: function (req, file, cb) {
    console.log(file)
    req.newName = Date.now() + "-" + file.originalname;
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg")
      cb(null, req.newName);
  },
});

var upload = multer({ storage });
module.exports = upload;
