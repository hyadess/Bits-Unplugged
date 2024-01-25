const ProfileController = require("./profileController");
const AuthController = require("./authController");

const profileController = new ProfileController();
const authController = new AuthController();

module.exports = { profileController, authController };
