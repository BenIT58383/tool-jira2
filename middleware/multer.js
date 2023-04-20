const multer = require('multer')
const path = require('path')
var mime = require('mime-types')

const storagePublicKey = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.mimetype !== 'application/x-x509-ca-cert' && file.mimetype !== 'application/x-pem-file') {
      // Nếu mime type không đúng, hủy bỏ tệp
      req.errorMessage = 'Wrong key type!';
      return cb(new Error(req.errorMessage), false);
    }

    cb(null, path.dirname(__dirname) + '/keys');
  },
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}`);
  }
})

const uploadPublicKey = multer({
  storage: storagePublicKey
})

module.exports = {
  uploadPublicKey
}