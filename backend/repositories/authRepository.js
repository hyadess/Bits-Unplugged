const Repository = require("./base");
const db = require("../models/index");
const sendMail = require("../services/email");

class AuthRepository extends Repository {
  constructor() {
    super();
  }

  getUserByEmailType = async (email, role) => {
    console.log(email);
    const credential = await db.Credential.findOne({
      where: {
        email,
        role,
      },
      include: [{ model: db.User, required: true }],
    });
    return credential;
  };

  getUserByNameType = async (username, role) => {
    const credential = await db.Credential.findOne({
      where: {
        role,
      },
      include: [{ model: db.User, required: true, where: { username } }],
    });
    return credential;
  };

  deleteAccount = async (id) => {
    const user = await db.User.findByPk(id);
    if (user) {
      await db.User.destroy({
        where: {
          id,
        },
      });
      return user;
    }
    return null;
  };

  saveEmailToken = async (userId, token) => {
    const emailToken = await db.EmailVerification.create({
      userId,
      token,
    });
    return emailToken;
  };

  getEmailToken = async (userId) => {
    const emailToken = await db.EmailVerification.findOne({
      where: {
        userId,
      },
    });
    return emailToken;
  };

  deleteEmailToken = async (id) => {
    const emailToken = await db.EmailVerification.destroy({
      where: {
        id,
      },
    });
    return emailToken;
  };

  getSetterRequests = async () => {
    const requests = await db.User.findAll({
      include: [
        { model: db.Setter, required: true, where: { isApproved: false } },
      ],
    });
    return requests;
  };

  approveSetter = async (id) => {
    const setter = await db.Setter.findOne({
      where: {
        userId: id,
      },
      include: [
        {
          model: db.User,
          required: true,
          as: "user",
          include: [{ model: db.Credential, required: true, as: "credential" }],
        },
      ],
    });
    if (setter) {
      setter.isApproved = true;
      await setter.save();
      return setter;
    }
    return setter;
  };

  signup = async (data, token) => {
    console.log(data);
    let transaction;
    try {
      transaction = await db.sequelize.transaction();
      const user = await db.User.create(
        {
          username: data.username,
          fullname: data.fullname,
        },
        { transaction }
      );
      const cred = await db.Credential.create(
        {
          userId: user.id,
          email: data.email,
          hashpass: data.hashPass,
          role: data.type,
        },
        { transaction }
      );
      if (data.type == 1) {
        await db.Setter.create(
          {
            userId: user.id,
          },
          { transaction }
        );
      }

      await transaction.commit();

      return cred;
    } catch (err) {
      // If an error occurs, rollback the transaction
      if (transaction) await transaction.rollback();
      if (err.name === "SequelizeUniqueConstraintError") {
        return null;
      }
      // Handle the error or rethrow it
      throw err;
    }
  };
}

module.exports = AuthRepository;
