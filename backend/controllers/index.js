const ProfileController = require("./profileController");
const AuthController = require("./authController");
const ArticleController = require("./articleController");

const profileController = new ProfileController();
const authController = new AuthController();
const articleController = new ArticleController();

module.exports = { profileController, authController, articleController };
