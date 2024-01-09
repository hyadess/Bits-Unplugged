const path = require("path");
require("dotenv").config({
  path: `.env${process.env.NODE_ENV ? "." + process.env.NODE_ENV : ""}`,
});
module.exports = {
  JWT_SECRET: process.env.JWT_SECRET || "kuddusmia",
  DB_USER: process.env.DB_USER || "postgres",
  DB_HOST: process.env.DB_HOST || "localhost",
  DB_PASS: process.env.DB_PASS || "root",
  DB_DB: process.env.DB_DB || "bitsunplugged2",
  DB_PORT: process.env.DB_PORT || "5432",
  PORT: process.env.PORT || "5000",
  ADMIN_PASS: process.env.ADMIN_PASS,
  development: {
    username: process.env.DB_USER || "postgres",
    host: process.env.DB_HOST || "localhost",
    password: process.env.DB_PASS || "root",
    database: process.env.DB_DB || "bitsunplugged2",
    port: process.env.DB_PORT || "5432",
    dialect: "postgres",
    // logging: false, // Set to console.log to see the raw SQL queries
    define: {
      underscored: false,
    },
  },
  test: {
    // Add test environment configuration if needed
  },
  production: {
    // Add production environment configuration if needed
  },
};
