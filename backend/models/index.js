"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const process = require("process");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.js")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
  // sequelize = new Sequelize(
  //   process.env.DB_DB,
  //   process.env.DB_USER,
  //   process.env.DB_PASS,
  //   conf
  // );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js" &&
      file.indexOf(".test.js") === -1
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// db.sequelize.sync();
// db.User.sync({ force: true });

module.exports = db;

// Create model Topic and relation topics
// models/topic.js and migrations/*****-create-topic.js: npx sequelize-cli model:generate --name Topic --attributes topic_id:integer,name:string,description:string logo:text
// seeders/****-demo-topics.js: npx sequelize-cli seed:generate --name demo-topic
// Insert to Database: npx sequelize-cli db:seed:all
