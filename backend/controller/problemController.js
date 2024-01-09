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
    let result = await problemRepository.getMyProblems(req.user.userId);
    this.handleResponse(result, res);
  };

  getProblemsBySeries = async (req, res) => {
    let result = await problemRepository.getProblemsBySeries(
      req.params.seriesId
    );
    this.handleResponse(result, res);
  };
  getUnsolvedProblemsBySeries = async (req, res) => {
    let result = await problemRepository.getUnsolvedProblemsBySeries(
      req.user.userId,
      req.params.seriesId
    );
    this.handleResponse(result, res);
  };

  //new for souvik......................
  getAllUnsolvedProblems = async (req, res) => {
    let result = await problemRepository.getAllUnsolvedProblems(
      req.user.userId
    );
    this.handleResponse(result, res);
  };
  //new for souvik......................
  getAllUnsolvedAndAttemptedProblems = async (req, res) => {
    let result = await problemRepository.getAllUnsolvedAndAttemptedProblems(
      req.user.userId
    );
    this.handleResponse(result, res);
  };
  //new for souvik......................
  getRecommendations = async (req, res) => {
    let result = await problemRepository.getRecommendations(req.user.userId);
    this.handleResponse(result, res);
  };

  getProblemsByTopic = async (req, res) => {
    let result = await problemRepository.getProblemsByTopic(req.params.topicId);
    this.handleResponse(result, res);
  };

  getProblemById = async (req, res) => {
    let result;
    if (req.user.type == 0) {
      result = await problemRepository.getPublishedProblemById(
        req.params.problemId
      );
    } else {
      result = await problemRepository.getProblemById(req.params.problemId);
    }
    this.handleResponse(result, res);
  };

  addProblem = async (req, res) => {
    let result = await problemRepository.addProblem(req.user.userId, req.body);
    this.handleResponse(result, res);
  };

  updateTitle = async (req, res) => {
    let result = await problemRepository.updateTitle(
      req.params.problemId,
      req.body.title
    );
    this.handleResponse(result, res);
  };
  updateStatement = async (req, res) => {
    let result = await problemRepository.updateStatement(
      req.params.problemId,
      req.body.statement
    );
    this.handleResponse(result, res);
  };

  updateCanvas = async (req, res) => {
    let result = await problemRepository.updateCanvas(
      req.params.problemId,
      req.body.canvasId,
      req.body.canvasData,
      req.body.params,
      req.body.uiParams,
      req.body.controlParams
    );
    this.handleResponse(result, res);
  };

  updateSeries = async (req, res) => {
    let result = await problemRepository.updateSeries(
      req.params.problemId,
      req.body.seriesId
    );
    this.handleResponse(result, res);
  };

  updateSerial = async (req, res) => {
    let result = await problemRepository.updateSerial(
      req.params.problemId,
      req.body.serialNo
    );
    this.handleResponse(result, res);
  };

  updateSolutionChecker = async (req, res) => {
    let result = await problemRepository.updateSolutionChecker(
      req.params.problemId,
      req.body.solutionChecker,
      req.body.checker_type
    );
    this.handleResponse(result, res);
  };

  deleteProblem = async (req, res) => {
    let result = await problemRepository.deleteProblem(req.params.problemId);
    this.handleResponse(result, res);
  };

  submitProblem = async (req, res) => {
    let result = await problemRepository.submitProblem(req.params.problemId);
    this.handleResponse(result, res);
  };

  publishProblem = async (req, res) => {
    let result = await problemRepository.publishProblem(req.params.problemId);
    this.handleResponse(result, res);
  };
  unpublishProblem = async (req, res) => {
    let result = await problemRepository.unpublishProblem(req.params.problemId);
    this.handleResponse(result, res);
  };

  // takeNthHint = async (req, res) => {};
  // rateProblem = async (req, res) => {};
  // getProblemRating = async (req, res) => {};
  // getProblemAvgRating = async (req, res) => {};
}

module.exports = ProblemController;
