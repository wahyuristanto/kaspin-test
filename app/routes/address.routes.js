const { authJwt } = require("../middleware");
const controller = require("../controllers/address.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/address/all", controller.allAddress);

  app.get(
    "/api/address/name",
    [authJwt.verifyToken],
    controller.getAddress
  );
  app.get(
    "/api/address/names",
    [authJwt.verifyToken],
    controller.getAddressBy
  );
};
