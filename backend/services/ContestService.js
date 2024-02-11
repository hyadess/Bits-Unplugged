const Service = require("./base");
const AuthRepository = require("../repositories/authRepository");
const { JWT_SECRET } = require("../config/config");
const authRepository = new AuthRepository();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendMail = require("./email");
const { promisify } = require("util");
const verifyTokenAsync = promisify(jwt.verify);


  acceptInvitation = async (token) => {
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