const SubmissionRepository = require("./submissionRepository");
const SeriesRepository = require("./seriesRepository");
const ProblemRepository = require("./problemRepository");
const AuthRepository = require("./authRepository");

const submissionRepository = new SubmissionRepository();
const seriesRepository = new SeriesRepository();
const problemRepository = new ProblemRepository();
const articleRepository = require("./articleRepository");
const authRepository = new AuthRepository();

module.exports = {
  submissionRepository,
  seriesRepository,
  problemRepository,
  articleRepository,
  authRepository,
};
