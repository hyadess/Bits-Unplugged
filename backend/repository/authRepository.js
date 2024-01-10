const Repository = require("./base");
const db = require("../models/index");

class AuthRepository extends Repository {
  constructor() {
    super();
  }

  getUserByEmailType = async (email, role) => {
    console.log(email);
    const credential = await db.Credential.findOne({
      where: {
        email,
      },
      include: [{ model: db.User, required: true, where: { role } }],
    });
    return credential;
  };

  getUserByNameType = async (username, role) => {
    const credential = await db.Credential.findOne({
      include: [{ model: db.User, required: true, where: { username, role } }],
    });
    return credential;
  };

  deleteAccount = async (userId) => {
    const query = `
      DELETE FROM "Users"
      WHERE "id" = $1
      RETURNING *;
    `;
    const params = [userId];
    const result = await this.query(query, params);
    return result;
  };

  signup = async (data) => {
    const user = await db.User.create({
      username: data.username,
      fullname: data.fullname,
      role: data.type,
    });
    await db.Credential.create({
      userId: user.id,
      email: data.email,
      hashpass: data.hashPass,
    });
    return user;
  };
}

module.exports = AuthRepository;
