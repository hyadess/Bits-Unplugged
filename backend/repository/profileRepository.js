const Repository = require("./base");

class ProfileRepository extends Repository {
  constructor() {
    super();
  }

  getProfile = async (user_id) => {
    const query = `
    SELECT * FROM Profile
    WHERE user_id = $1;
    `;
    const params = [user_id];
    const result = await this.query(query, params);
    return result;
  };

  setProfile = async (data) => {
    const query = `
        INSERT INTO Profile (fullname, username, image, dob, is_public)
        VALUES ($1, $2, $3, $4, $5);
        `;
    const params = [
      data.fullname,
      data.username,
      data.image,
      data.dob,
      data.is_public,
    ];

    const result = await this.query(query, params);
    return result;
  };
  updateProfile = async (user_id, data) => {
    const query = `
        UPDATE Profile
        SET fullname = $2, username = $3, image = $4, dob = $5, is_public = $6
        WHERE user_id = $1;
        `;
    const params = [
      user_id,
      data.fullname,
      data.username,
      data.image,
      data.dob,
      data.is_public,
    ];
    // console.log("params " + data.username);
    const result = await this.query(query, params);
    return result;
  };
}
module.exports = ProfileRepository;
