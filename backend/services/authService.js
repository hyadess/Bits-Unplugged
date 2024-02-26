const Service = require("./base");
const AuthRepository = require("../repositories/authRepository");
const { JWT_SECRET } = require("../config/config");
const authRepository = new AuthRepository();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendMail = require("./email");
const { promisify } = require("util");
const verifyTokenAsync = promisify(jwt.verify);

const ACCESS_TOKEN_EXPIRATION = 3600;
const REFRESH_TOKEN_EXPIRATION = 90 * 86400;
class AuthService extends Service {
  constructor() {
    super();
  }

  getAccessToken = (payload) => {
    const token = jwt.sign(
      {
        username: payload.username,
        userId: payload.userId,
        email: payload.email,
        pass: payload.pass,
        type: payload.type,
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
        username: payload.username,
        userId: payload.userId,
        email: payload.email,
        pass: payload.pass,
        type: payload.type,
        iss: "bitsunplugged.onrender.com",
      },
      JWT_SECRET,
      { expiresIn: `${REFRESH_TOKEN_EXPIRATION}s` }
    );
    return token;
  };

  signup = async (data, url) => {
    data["hashPass"] = bcrypt.hashSync(data.pass, 10);
    let user = await authRepository.signup(data);
    if (!user) {
      return { success: false };
    }

    if (data.type == 0) {
      const token = this.getAccessToken(
        {
          username: data.username,
          userId: user.userId,
          email: data.email,
          pass: user.hashpass,
          type: data.type,
        },
        JWT_SECRET
      );
      await authRepository.saveEmailToken(user.userId, token);
      sendMail(
        data.email,
        "Email Verification",
        `Please verify your email: ${url}/verify-email?type=${data.type}&token=${token}`
      );
      console.log("Email sent");
    }
    // else if(data.type == 1){
    //   await
    // }
    return { success: true, user };
  };

  approveSetter = async (id, url) => {
    const setter = await authRepository.approveSetter(id);
    if (setter) {
      const token = this.getAccessToken(
        {
          username: setter.user.username,
          userId: setter.userId,
          email: setter.user.credential.email,
          pass: setter.user.credential.hashpass,
          type: 1,
        },
        JWT_SECRET
      );
      await authRepository.saveEmailToken(setter.userId, token);
      sendMail(
        setter.user.credential.email,
        "Email Verification",
        `Please verify your email: ${url}/verify-email?type=1&token=${token}`
      );
      console.log("Email sent");
      return { success: true };
    }
    return { success: false };
  };

  verifyEmail = async (token) => {
    try {
      const payload = await verifyTokenAsync(token, JWT_SECRET);
      var isValid = await this.tokenValidity(payload); //checking whether the current password is the same
      console.log(payload);
      if (isValid) {
        const res = await authRepository.getEmailToken(payload.userId);
        if (res.token === token) {
          await authRepository.deleteEmailToken(res.id);
          return { success: true };
        }
      }
    } catch (err) {
      console.error(err);
      return {
        success: false,
      };
    }
    return { success: false };
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
    // console.log("ID PASS:", credential);
    return credential;
  };

  tokenValidity = async (data) => {
    const user = await this.getIdPass(data);

    if (user) {
      if (user.userId == data.userId && user.hashpass == data.pass) {
        return true;
      }
    } else {
      return false;
    }
  };

  getNewAccessToken = async (refreshToken) => {
    if (refreshToken) {
      try {
        const payload = await verifyTokenAsync(refreshToken, JWT_SECRET);
        var isValid = await this.tokenValidity(payload); //checking whether the current password is the same
        if (isValid) {
          return {
            success: true,
            accessToken: this.getAccessToken(payload),
          };
        }
      } catch (err) {
        // Handle verification errors
        console.error(err);
        // Return appropriate response or throw an error
        return {
          success: false,
          message: "Refresh token verification failed",
        };
      }
    }
    return { success: false };
  };

  login = async (data) => {
    const credential = await this.getIdPass(data);
    if (credential) {
      const token = await authRepository.getEmailToken(credential.userId);
      const isAppr = await authRepository.isApproved(credential.userId);

      if (!token && (data.type !== 1 || isAppr)) {
        if (bcrypt.compareSync(data.pass, credential.hashpass)) {
          return {
            success: true,
            refreshToken: this.getRefreshToken({
              username: credential.user.username,
              userId: credential.userId,
              email: data.email,
              pass: credential.hashpass,
              type: data.type,
            }),
            accessToken: this.getAccessToken({
              username: credential.user.username,
              userId: credential.userId,
              email: data.email,
              pass: credential.hashpass,
              type: data.type,
            }),
          };
        }
      }
      return {
        success: false,
        message: "Email not verified",
      };
    }
    return {
      success: false,
    };
  };
}

module.exports = AuthService;
