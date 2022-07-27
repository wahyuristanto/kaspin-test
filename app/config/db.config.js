module.exports = {
  HOST: "192.168.1.11",
  USER: "root",
  PASSWORD: "Qwerty@123",
  DB: "test_kaspin",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
