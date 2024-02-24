
const Repository = require("./base");

class ProfileRepository extends Repository {
  constructor() {
    super();
  }

  getProfile = async (user_id) => {
    const query = `
      SELECT "U".*, "C"."email"
      FROM "Users" "U"
      JOIN "Credentials" "C" ON "U"."id" = "C"."userId"
      WHERE "U"."id" = $1;
    `;
    const params = [user_id];
    const result = await this.query(query, params);
    return result;
  };

  getProfileByUsername = async (username) => {
    const query = `
      SELECT "U".*, "C"."email"
      FROM "Users" "U"
      JOIN "Credentials" "C" ON "U"."id" = "C"."userId"
      WHERE "U"."username" = $1;
    `;
    const params = [username];
    const result = await this.query(query, params);
    return result;
  }

  searchProfileByQuery = async (seachQuery) => {
    const query = `
      SELECT "U".*, "C"."email","C"."role"
      FROM "Users" AS "U"
      JOIN "Credentials" AS "C" ON "U"."id" = "C"."userId"
      WHERE "U"."username" LIKE '%' || $1 || '%';
    `;
    const params = [seachQuery];
    const result = await this.query(query, params);
    return result;
  }

  setProfile = async (data) => {
    const query = `
        INSERT INTO "Users" ("fullname", "username", "image", "dob", "is_public")
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
      UPDATE "Users"
      SET "fullname" = $2, "username" = $3, "image" = $4
      WHERE "id" = $1;
    `;
    const params = [
      user_id,
      data.fullname,
      data.username,
      data.image,
      // data.dob,
      // data.is_public,
    ];
    const result = await this.query(query, params);
    return result;
  };
}

module.exports = ProfileRepository;
