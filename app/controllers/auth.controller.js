const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  // Save User to Database
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  })
    .then(user => {
      res.send({ 
        alert: {
          code: res.statusCode,
          message: "User registered successfully!" 
        }
      });
    })
    .catch(err => {
      res.status(500).send({ 
        alert: {
          code: res.statusCode,
          message: err.message 
        }
      });
    });
};

exports.signin = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({
          alert: {
            code: res.statusCode,
            message: "User Not found." 
          }
        });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          alert: {
            code: res.statusCode,
            accessToken: null,
            message: "Invalid Password!"
          }
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

        res.status(200).send({
          alert: {
            code: res.statusCode,
            message : "Ok"
          }, data: {
          id: user.id,
          username: user.username,
          email: user.email,
          accessToken: token
        }});
    })
    .catch(err => {
      res.status(500).send({ 
        alert: {
          code: res.statusCode,
          message: err.message 
        }
      });
    });
};
