require("dotenv").config();
const Pool = require("pg").Pool;

class Repository {
  constructor() {
    this.pool = undefined;
  }
  // code to execute sql
  query = async (query, params) => {
    let result;
    try {
      if (this.pool === undefined) {
        this.pool = new Pool({
          user: process.env.DB_USER,
          host: process.env.DB_HOST,
          database: process.env.DB_DB,
          password: process.env.DB_PASS,
          port: process.env.DB_PORT,
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
}
module.exports = Repository;
