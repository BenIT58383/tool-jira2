const jwt = require("jsonwebtoken");
let config = require('../config');
let fs = require('fs');
const crypto = require('crypto');
const _ = require('lodash');

const verifyKey = async (req, res, next) => {
  try {
    //check file empty
    let isEmptyFile = _.isEmpty(req.file)

    if (isEmptyFile) {
      return res.status(403).send("Key isn't empty!");
    }

    //get public key
    let fileKey = fs.readFileSync(req.file.path)

    //convert from type buffer to key object
    let publickey = crypto.createPublicKey(fileKey)

    if (!publickey) {
      return res.status(403).send("A key is required for authentication");
    }
    //handle check key
    let isPublicKey = false

    // get private key
    let privateKey = fs.readFileSync('./keys/private-key.pem');

    //sign with private key
    let token = jwt.sign('functionAuthentication', privateKey, { algorithm: 'RS384' });

    //verify key
    jwt.verify(token, publickey, { algorithms: ['RS384'] }, function (err, decoded) {
      decoded ? isPublicKey = true : console.log(err)
    });

    if (!isPublicKey) {
      return res.status(401).send("Invalid Key");
    }
    
    //delete public key after verify
    fs.unlink(req.file.path, (err) => {
      if (err) {
        console.error(`Delete public key error: ${err}`);
      } else {
        console.log('Delete public key success!');
      }
    });

    //next
    return next();
  } catch (err) {
    console.log(err);
    return res.status(401).send("Invalid key");
  }
};

module.exports = verifyKey;
