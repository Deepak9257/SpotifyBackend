const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    const appendName = uuidv4();
    cb(null, appendName + '-' + file.originalname)
  }

})

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1000 * 1024 * 1024  // 1000MB limit per file
  }
})

module.exports = upload
