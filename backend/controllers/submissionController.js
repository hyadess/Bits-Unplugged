const Controller = require("./base");
const SubmissionRepository = require("../repositories/submissionRepository");
const submissionRepository = new SubmissionRepository();
class SubmissionController extends Controller {
  constructor() {
    super();
  }
  getAllSubmissionsByUserAndProblem = async (req, res) => {
    let result = await submissionRepository.getAllSubmissionsByUserAndProblem(
      req.user.userId,
      req.params.problemId
    );
    this.handleResponse(result, res);
  };
  getAllSubmissionsByProblem = async (req, res) => {
    let result = await submissionRepository.getAllSubmissionsByProblem(
      req.params.problemId
    );
    this.handleResponse(result, res);
  };
  getAllSubmissionsByUser = async (req, res) => {
    let result = await submissionRepository.getAllSubmissionsByUser(
      req.user.userId
    );
    this.handleResponse(result, res);
  };
  // getUnsolvedProblemList = async (req, res) => {};
  // getProblemStats = async (req, res) => {};
  submitSolution = async (req, res) => {
    let result = await submissionRepository.submitSolution(
      req.user.userId,
      req.params.problemId,
      req.body
    );
    this.handleResponse(result, res);
  };

  // checkSolution = async (req, res) => {};
  // rateUser = async (req, res) => {};
}

module.exports = SubmissionController;
