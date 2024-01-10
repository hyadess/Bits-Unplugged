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

  deleteAccount = async (id) => {
    const deletedUser = await db.User.destroy({
      where: {
        id,
      },
      returning: true, // This option returns the deleted user
    });

    if (!deletedUser) {
      return null; // Handle the case where the user does not exist or no rows were deleted
    }

    return deletedUser;
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
