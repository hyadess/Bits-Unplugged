const path = require("path");
require("dotenv").config({
  path: `.env${process.env.NODE_ENV ? "." + process.env.NODE_ENV : ""}`,
});
module.exports = {
  JWT_SECRET: process.env.JWT_SECRET || "kuddusmia",
  DB_USER: process.env.DB_USER || "postgres",
  DB_HOST: process.env.DB_HOST || "localhost",
  DB_PASS: process.env.DB_PASS || "root",
  DB_DB: process.env.DB_DB || "bitsunplugged",
  DB_PORT: process.env.DB_PORT || "5432",
  PORT: process.env.PORT || "5000",
  ADMIN_PASS: process.env.ADMIN_PASS,
};
