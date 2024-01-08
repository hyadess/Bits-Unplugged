const { Sequelize } = require("sequelize");
// Connection parameters
const sequelize = new Sequelize(
  process.env.DB_DB,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
  }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;
