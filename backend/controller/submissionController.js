const Controller = require("./base");
const SubmissionsRepository = require("../repository/submissionsRepository");
const submissionsRepository = new SubmissionsRepository();
class SubmissionsController extends Controller {
  constructor() {
    super();
  }
  getAllSubmissionsByUserAndProblem = async (req, res) => {};
  getAllSubmissionsByProblem = async (req, res) => {};
  getAllSubmissionsByUser = async (req, res) => {};
  getUnsolvedProblemList = async (req, res) => {};
  getProblemStats = async (req, res) => {};
  submitSolution = async (req, res) => {};
  checkSolution = async (req, res) => {};
  rateUser = async (req, res) => {};
}

module.exports = SubmissionsController;
