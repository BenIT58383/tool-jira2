var verifyKey = require('../middleware/verifyKey');
var user = require('./user/routes');
let {uploadPublicKey} = require('../middleware/multer')

module.exports = function (app) {
  app.use('*',uploadPublicKey.single('file'), verifyKey) 
  app.use('/api', user)
}

