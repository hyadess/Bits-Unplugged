const ProfileController = require("./profileController");
const AuthController = require("./authController");
const ArticleController = require("./articleController");
const SubmissionController = require("./submissionController");

const profileController = new ProfileController();
const authController = new AuthController();
const articleController = new ArticleController();
const submissionController = new SubmissionController();

module.exports = {
  profileController,
  authController,
  articleController,
  submissionController,
};
