const express = require("express");
const cors = require("cors");
const logger = require('./app/config/logger')

const app = express();

//setup the logger
logger.setRequest(app)
var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// database
const db = require("./app/models");
// db.sequelize.sync();
// force: true will drop the table if it already exists
db.sequelize.sync({force: false}).then(() => {
  console.log('Drop and Resync Database with { force: true }');
});

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Kasir Pintar public API." });
});

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/address.routes')(app);
// 404 Not Found routes
app.all('*', (req, res) => {
  res.status(404).send({
    alert:{
      code: res.statusCode,
      message : "This resource was not found"
    }
  })
})

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});