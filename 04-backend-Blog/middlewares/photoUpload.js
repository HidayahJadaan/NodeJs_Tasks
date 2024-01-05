const path = require("path");
const multer = require("multer");

// USING MULTER (LOCAL STORAGE)
// 1. Storage : Destination & FileName

const photoStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../images"));
  },
  filename: function (req, file, cb) {
    if (file) {
      cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
    } else {
      cb(null, false);
    }
  },
});

//  2. Middleware for uploading photo

const photoUpload = multer({
  storage: photoStorage,
  fileFilter: function (req, file, cb) {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb({ message: "UnSupported File Format" }, false);
    }
  },
  limits: {fileSize: 1024 * 1024 * 2} // 1 * 2 MB
});

module.exports = photoUpload;