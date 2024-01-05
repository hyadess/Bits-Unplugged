const path = require("path");
require("dotenv").config({
  path: `.env${process.env.NODE_ENV ? "." + process.env.NODE_ENV : ""}`,
});
const Pool = require("pg").Pool;
const cache = require("node-cache");
const {
  DB_USER,
  DB_HOST,
  DB_DB,
  DB_PASS,
  DB_PORT,
} = require("../config/config");
const DEFAULT_EXPIRATION = 3600;
const mycache = new cache({
  deleteOnExpire: true,
  stdTTL: 5 * 60,
});

class Repository {
  constructor() {
    this.pool = undefined;
  }

  check = async () => {
    const result = await this.query("SELECT * FROM profile LIMIT 1;", []);
    return result;
  };
  // code to execute sql
  query = async (query, params) => {
    let result;
    console.log(process.env.NODE_ENV, DB_HOST, process.env.DB_HOST);
    try {
      if (this.pool === undefined) {
        this.pool = new Pool({
          user: DB_USER,
          host: DB_HOST,
          database: DB_DB,
          password: DB_PASS,
          port: DB_PORT,
          // ssl: {
          //   rejectUnauthorized: false,
          // },
        });
      }
      result = await this.pool.query(query, params);
      return {
        success: true,
        data: result.rows,
      };
    } catch (error) {
      console.log("COULD NOT CONNECT TO PG");
      console.log(error);
      console.log(query, params);
      return {
        success: false,
        error: error,
      };
    }
  };

  query_redis = async (key, query, params) => {
    let data = await this.get_redis(key);
    if (data != null) {
      return {
        success: true,
        data: JSON.parse(data),
      };
    }
    let result = await this.query(query, params);
    if (!result.success) return result;
    data = result.data;
    await this.set_redis(key, JSON.stringify(data));
    return result;
  };

  set_redis = async function (key, data) {
    try {
      if (key != null && data != null) mycache.set(key, data);
      return true;
    } catch (e) {
      return false;
    }
  };

  get_redis = async function (key) {
    try {
      if (key != null) {
        const data = mycache.get(key);
        if (data != null) return data;
      }
    } catch (error) {
      return null;
    }
  };

  delete_redis = async function (keys) {
    try {
      mycache.del(keys);
      return;
    } catch (error) {
      return;
    }
  };
}
module.exports = Repository;
