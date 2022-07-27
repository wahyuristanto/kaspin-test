
const service = require('../../services/KaspinService');


exports.allAddress = async (req, res) => {
  let response  = await service.getAddress(req)
  res.status(200).send(response);
};

exports.getAddress = async (req, res) => {
  const {
    id
  } = req.query;
  let response  = await service.getAddress(req)
  var picked = response.address_kecamatan.find(o => o.id === id);
    if(!picked){
      return res.status(404).send({
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
      message : "Ok"
    }, data: picked
  });
};

exports.getAddressBy = async (req, res) => {
  const {
    kota_id
  } = req.query;
  
  let response  = await service.getAddress(req)
  var picked = response.address_kecamatan
    .filter(o => o.kota_id === kota_id);

  if (!picked.length) {
    return res.status(404).send({
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
      message : "Ok"
    }, data: picked
  });
};
