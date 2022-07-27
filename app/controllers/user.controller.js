
const service = require('../../services/KaspinService');
const db = require("../models");

exports.userBoard = (req, res) => {
  db.user.findAll({ 
    
  }).then(data => {
    res.status(200).send({
      alert: {
          code: res.statusCode,
          message: `Success`,
      },
      data: data
    });
  })
  .catch(err => {
    res.status(500).send({ message: err.message })
  })
}

exports.userDetail = (req, res) => {
  const id = req.params.id;

  db.user.findOne({ 
    where: { id: id }
  }).then(data => {
    if(!data){
      res.status(404).send({
        alert: {
            code: res.statusCode,
            message: 'Data Not Found',
            ex: 'xxx'
        }
      });
    }


    res.status(200).send({
      alert: {
          code: res.statusCode,
          message: `Success`,
      },
      data: data
    });
  })
  .catch(err => {
    res.status(500).send({ message: err.message })
  })
}
