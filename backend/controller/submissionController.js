const Controller = require("./base");
const SubmissionRepository = require("../repository/submissionRepository");
const submissionRepository = new SubmissionRepository();
class SubmissionController extends Controller {
  constructor() {
    super();
  }
  getAllSubmissionsByUserAndProblem = async (req, res) => {
    let result = await submissionRepository.getAllSubmissionsByUserAndProblem(
      req.user.user_id,
      req.params.problem_id
    );
    this.handleResponse(result, res);
  };
  getAllSubmissionsByProblem = async (req, res) => {
    let result = await submissionRepository.getAllSubmissionsByProblem(
      req.params.problem_id
    );
    this.handleResponse(result, res);
  };
  getAllSubmissionsByUser = async (req, res) => {
    let result = await submissionRepository.getAllSubmissionsByUser(
      req.user.user_id
    );
    this.handleResponse(result, res);
  };
  // getUnsolvedProblemList = async (req, res) => {};
  // getProblemStats = async (req, res) => {};
  submitSolution = async (req, res) => {
    let result = await submissionRepository.submitSolution(
      req.user.user_id,
      req.params.problem_id,
      req.body
    );
    this.handleResponse(result, res);
  };

  // checkSolution = async (req, res) => {};
  // rateUser = async (req, res) => {};
}

module.exports = SubmissionController;
