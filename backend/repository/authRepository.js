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
    return result;
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
    return result;
  };
  deleteAccount = async (user_id) => {
    const query = `
      DELETE FROM Profile
      WHERE user_id = $1
      RETURNING *;
    `;
    const params = [user_id];
    const result = await this.query(query, params);
    return result;
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
        VALUES ($1,$2,$3,$4)
        RETURNING auth_id;
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
}

module.exports = AuthRepository;
