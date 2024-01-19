const Controller = require("./base");
const ProblemRepository = require("../repositories/problemRepository");
const problemRepository = new ProblemRepository();
class ProblemController extends Controller {
  constructor() {
    super();
  }

  getAllProblems = async (req, res) => {
    this.handleRequest(res, async () => {
      let problems =
        req.user.type === 0
          ? undefined
          : req.user.type === 1
          ? await problemRepository.getMyProblems(req.user.userId)
          : await problemRepository.getSubmittedProblems();
      res.status(200).send(problems);
    });
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

  getProblemById = async (req, res) => {
    this.handleRequest(res, async () => {
      let problem =
        req.user.type == 0
          ? await problemRepository.getPublishedProblemById(req.params.id)
          : req.user.type == 1
          ? await problemRepository.getProblemById(req.params.id)
          : await problemRepository.getSubmittedProblemById(req.params.id);
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

  deleteProblem = async (req, res) => {
    this.handleRequest(res, async () => {
      const deletedProblem = await problemRepository.deleteProblem(
        req.params.id
      );
      if (!deletedProblem) {
        res.status(404).json({ error: "Problem not found" });
      } else {
        res.status(200).json({ message: "Problem deleted successfully" });
      }
    });
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
