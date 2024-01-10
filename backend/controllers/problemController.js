const Controller = require("./base");
const ProblemRepository = require("../repositories/problemRepository");
const problemRepository = new ProblemRepository();
class ProblemController extends Controller {
  constructor() {
    super();
  }

  getAllProblems = async (req, res) => {
    this.handleRequest(res, async () => {
      let problems = await problemRepository.getAllProblems();
      res.status(200).send(problems);
    });
  };

  getSubmittedProblems = async (req, res) => {
    this.handleRequest(res, async () => {
      let problems = await problemRepository.getSubmittedProblems();
      res.status(200).send(problems);
    });
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
    this.handleRequest(res, async () => {
      let problem;
      if (req.user.type == 0) {
        problem = await problemRepository.getPublishedProblemById(
          req.params.problemId
        );
      } else if (req.user.type == 1) {
        problem = await problemRepository.getProblemById(req.params.problemId);
      } else {
        problem = await problemRepository.getSubmittedProblemById(
          req.params.problemId
        );
      }
      if (!problem) {
        res.status(404).json({ error: "Problem not found" });
      } else {
        res.status(200).json(problem);
      }
    });
  };
  createProblem = async (req, res) => {
    this.handleRequest(res, async () => {
      const newProblem = await problemRepository.createProblem(
        req.user.userId,
        req.body
      );
      res.status(201).json(newProblem);
    });
  };

  updateProblem = async (req, res) => {
    this.handleRequest(res, async () => {
      const updatedProblem = await problemRepository.updateProblem(
        req.params.id,
        req.body
      );
      if (!updatedProblem) {
        res.status(404).json({ error: "Problem not found" });
      } else {
        res.status(200).json(updatedProblem);
      }
    });
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
      req.body.previewOptions,
      req.body.previewOptions
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
    this.handleRequest(res, async () => {
      let problem = await problemRepository.submitProblem(req.params.problemId);
      if (!problem) {
        res.status(404).json({ error: "Problem not found" });
      } else {
        res.status(201).json(problem);
      }
    });
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
