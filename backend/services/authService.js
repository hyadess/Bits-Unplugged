const Service = require("./base");
const AuthRepository = require("../repositories/authRepository");
const { JWT_SECRET } = require("../config/config");
const authRepository = new AuthRepository();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const ACCESS_TOKEN_EXPIRATION = 3600;
const REFRESH_TOKEN_EXPIRATION = 86400;
class AuthService extends Service {
  constructor() {
    super();
  }

  getAccessToken = (payload) => {
    const token = jwt.sign(
      {
        ...payload,
        iss: "bitsunplugged.onrender.com",
      },
      JWT_SECRET,
      {
        expiresIn: `${ACCESS_TOKEN_EXPIRATION}s`,
      }
    );
    return token;
  };

  getRefreshToken = (payload) => {
    const token = jwt.sign(
      {
        ...payload,
        iss: "bitsunplugged.onrender.com",
      },
      JWT_SECRET,
      { expiresIn: `${REFRESH_TOKEN_EXPIRATION}s` }
    );
    return token;
  };

  signup = async (data) => {
    req.body["hashPass"] = bcrypt.hashSync(data.pass, 10);
    let user = await authRepository.signup(data);
    return { success: true, user };
  };

  deleteAccount = async (id) => {
    const isDeleted = await authRepository.deleteAccount(id);
    if (!isDeleted) {
      return { success: false };
    } else {
      return { success: true };
    }
  };

  getIdPass = async (data) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const usernamePattern = /^[a-zA-Z0-9_]{3,20}$/;
    var emailFormat =
      /^[a-zA-Z0-9_.+]+(?<!^[0-9]*)@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

    let credential;
    if (data.email !== "" && data.email.match(emailPattern)) {
      credential = await authRepository.getUserByEmailType(
        data.email,
        data.type
      );
    } else {
      credential = await authRepository.getUserByNameType(
        data.email,
        data.type
      );
    }
    return credential;
  };

  tokenValidity = async (data) => {
    const user = await this.getIdPass(data);

    if (user) {
      if (user.userId == id && user.hashpass == pass) {
        return true;
      }
    } else {
      return false;
    }
  };

  getNewAccessToken = async (refreshToken) => {
    if (refreshToken) {
      jwt.verify(refreshToken, JWT_SECRET, async (err, payload) => {
        if (!err) {
          var isValid = await this.tokenValidity(payload); //checking whether the current password is the same
          if (isValid) {
            return {
              success: true,
              accessToken: this.getAccessToken(payload),
            };
          }
        }
      });
    }
    return { success: false };
  };

  login = async (data) => {
    const credential = await this.getIdPass(data);
    if (credential) {
      if (bcrypt.compareSync(data.pass, credential.hashpass)) {
        return {
          success: true,
          refreshToken: this.getRefreshToken({
            userId: credential.userId,
            email: data.email,
            pass: credential.hashpass,
            type: data.type,
          }),
          accessToken: this.getAccessToken({
            userId: credential.userId,
            email: data.email,
            pass: credential.hashpass,
            type: data.type,
          }),
        };
      }
      // password doesn't match
    }
    return {
      success: false,
    };
  };
}

module.exports = AuthService;
