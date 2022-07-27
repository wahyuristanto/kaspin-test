const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      alert: {
        code: res.statusCode,
        message: "No token provided!"
      }
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        alert: {
            code: res.statusCode,
            message: `Unauthorized`,
            ex: 'xxx'
        }
    });
    }
    req.userId = decoded.id;
    next();
  });
};

const authJwt = {
  verifyToken: verifyToken
};
module.exports = authJwt;
