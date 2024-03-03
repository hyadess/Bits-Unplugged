const SubmissionRepository = require("./submissionRepository");
const SeriesRepository = require("./seriesRepository");
const ProblemRepository = require("./problemRepository");
const AuthRepository = require("./authRepository");
const ContestRepository = require("./contestRepository");

const submissionRepository = new SubmissionRepository();
const seriesRepository = new SeriesRepository();
const problemRepository = new ProblemRepository();
const articleRepository = require("./articleRepository");
const authRepository = new AuthRepository();
const contestRepository = new ContestRepository();

module.exports = {
  submissionRepository,
  seriesRepository,
  problemRepository,
  articleRepository,
  authRepository,
  contestRepository,
};
