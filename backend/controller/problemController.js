const Controller = require("./base");
const ProblemRepository = require("../repository/problemRepository");
const problemRepository = new ProblemRepository();
class ProblemController extends Controller {
  constructor() {
    super();
  }

  getAllProblems = async (req, res) => {
    let result = await problemRepository.getAllProblems();
    this.handleResponse(result, res);
  };
  getSubmittedProblems = async (req, res) => {
    let result = await problemRepository.getSubmittedProblems();
    this.handleResponse(result, res);
  };
  getMyProblems = async (req, res) => {
    let result = await problemRepository.getMyProblems(req.body.user_id);
    this.handleResponse(result, res);
  };

  getProblemsBySeries = async (req, res) => {
    let result = await problemRepository.getProblemsBySeries(
      req.params.series_id
    );
    this.handleResponse(result, res);
  };

  getProblemsByTopic = async (req, res) => {
    let result = await problemRepository.getProblemsByTopic(
      req.params.topic_id
    );
    this.handleResponse(result, res);
  };

  getProblemById = async (req, res) => {
    let result;
    if (req.body.type == 0) {
      result = await problemRepository.getPublishedProblemById(
        req.params.problem_id
      );
    } else {
      result = await problemRepository.getProblemById(req.params.problem_id);
    }
    this.handleResponse(result, res);
  };

  addProblem = async (req, res) => {
    let result = await problemRepository.addProblem(req.body.user_id, req.body);
    this.handleResponse(result, res);
  };

  updateTitle = async (req, res) => {
    let result = await problemRepository.updateTitle(
      req.params.problem_id,
      req.body.title
    );
    this.handleResponse(result, res);
  };
  updateStatement = async (req, res) => {
    let result = await problemRepository.updateStatement(
      req.params.problem_id,
      req.body.statement
    );
    this.handleResponse(result, res);
  };

  updateCanvas = async (req, res) => {
    let result = await problemRepository.updateCanvas(
      req.params.problem_id,
      req.body.canvas_id,
      req.body.canvas_data
    );
    this.handleResponse(result, res);
  };

  updateSeries = async (req, res) => {
    let result = await problemRepository.updateSeries(
      req.params.problem_id,
      req.body.series_id
    );
    this.handleResponse(result, res);
  };

  updateSolutionChecker = async (req, res) => {
    let result = await problemRepository.updataSolutionChecker(
      req.params.problem_id,
      req.body.solution_checker
    );
    this.handleResponse(result, res);
  };

  deleteProblem = async (req, res) => {
    let result = await problemRepository.deleteProblem(req.params.problem_id);
    this.handleResponse(result, res);
  };

  submitProblem = async (req, res) => {
    let result = await problemRepository.submitProblem(req.params.problem_id);
    this.handleResponse(result, res);
  };

  publishProblem = async (req, res) => {
    let result = await problemRepository.publishProblem(req.params.problem_id);
    this.handleResponse(result, res);
  };
  unpublishProblem = async (req, res) => {
    let result = await problemRepository.unpublishProblem(
      req.params.problem_id
    );
    this.handleResponse(result, res);
  };

  // takeNthHint = async (req, res) => {};
  // rateProblem = async (req, res) => {};
  // getProblemRating = async (req, res) => {};
  // getProblemAvgRating = async (req, res) => {};
}

module.exports = ProblemController;
