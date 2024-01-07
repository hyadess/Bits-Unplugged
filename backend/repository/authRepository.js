const Repository = require("./base");

class AuthRepository extends Repository {
  constructor() {
    super();
  }
  // getUserByEmail = async (email) => {
  //   const query = `
  //   SELECT *
  //   FROM Auth
  //   WHERE email=$1;
  // `;
  //   const params = [email];
  //   const result = await this.query(query, params);
  //   return result;
  // };
  getUserByEmailType = async (email, type) => {
    // console.log(email, type);
    const query = `
      SELECT *
      FROM Auth
      WHERE email=$1 AND authtype=$2;
    `;
    const params = [email, type];
    const result = await this.query(query, params);
    if (result.success && result.data.length > 0) return result;
    return {
      success: false,
      error: "Invalid credentials",
    };
  };
  getUserByNameType = async (username, type) => {
    const query = `
      SELECT *
      FROM Auth A
      JOIN Profile P
      ON P.user_id = A.auth_id
      WHERE P.username=$1 AND A.authtype=$2;
    `;
    const params = [username, type];
    const result = await this.query(query, params);
    if (result.success && result.data.length > 0) return result;
    return {
      success: false,
      error: "Invalid credentials",
    };
  };
  signup = async (data) => {
    const query = `
    INSERT INTO Profile (username, fullname)
    VALUES ($1, $2)
    ON CONFLICT (username) DO NOTHING
    RETURNING user_id;
  `;
    const params = [data.username, data.fullname];
    const result = await this.query(query, params);
    if (result.success) {
      if (result.data.length == 1) {
        const query2 = `
        INSERT INTO Auth (auth_id, email, hashpass, authtype)
        VALUES ($1,$2,$3,$4);
      `;
        const params2 = [
          result.data[0].user_id,
          data.email,
          data.hashPass,
          data.type,
        ];
        return await this.query(query2, params2);
      } else {
        return {
          success: true,
          error: "Username already exists",
        };
      }
    }
    return result;
  };

  tokenValidity = async (id, email, pass, type) => {
    var emailFormat =
      /^[a-zA-Z0-9_.+]+(?<!^[0-9]*)@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

    let result;
    if (email !== "" && email.match(emailFormat)) {
      result = await this.getUserByEmailType(email, type);
    } else {
      result = await this.getUserByNameType(email, type);
    }
    // console.log(result);
    if (result.success) {
      if (result.data[0].auth_id == id && result.data[0].hashpass == pass) {
        return true;
      }
    }
    return false;
  };
}

module.exports = AuthRepository;
