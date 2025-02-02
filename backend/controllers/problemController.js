const Controller = require("./base");
const ProblemRepository = require("../repositories/problemRepository");
const { submissionRepository } = require("../repositories");

const problemRepository = new ProblemRepository();
class ProblemController extends Controller {
  constructor() {
    super();
  }

  getAllProblems = async (req, res) => {
    this.handleRequest(res, async () => {
      let problems =
        req.user.type === 0
          ? await problemRepository.getAllLiveProblems(req.user.userId)
          : req.user.type === 1
          ? await problemRepository.getMyProblems(req.user.userId)
          : await problemRepository.getSubmittedProblems();
      res.status(200).send(problems);
    });
  };

  cloneProblem = async (req, res) => {
    this.handleRequest(res, async () => {
      let problem = await problemRepository.cloneProblem(req.params.id);
      res.status(200).send(problem);
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

  getContestProblemById = async (req, res) => {
    this.handleRequest(res, async () => {
      let problem = await problemRepository.getProblemById(req.params.id);
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
      const updatedProblem =
        req.user.type === 1
          ? await problemRepository.updateProblem(req.params.id, req.body)
          : req.user.type === 2
          ? await problemRepository.updateProblem(req.params.id, req.body)
          : await problemRepository.updateProblemVersion(
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

  approveProblem = async (req, res) => {
    this.handleRequest(res, async () => {
      const approvedProblem = await problemRepository.approveProblem(
        req.params.id
      );
      if (!approvedProblem) {
        res.status(404).json({ error: "Problem not found" });
      } else {
        res.status(200).json(approvedProblem);
      }
    });
  };

  rejectProblem = async (req, res) => {
    this.handleRequest(res, async () => {
      const rejectedProblem = await problemRepository.rejectProblem(
        req.params.id,
        req.body.feedback
      );
      if (!rejectedProblem) {
        res.status(404).json({ error: "Problem not found" });
      }
      res.status(200).json(rejectedProblem);
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
      let problem = await problemRepository.submitProblem(req.params.id);
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

  getSubmissions = async (req, res) => {
    console.log("here");
    this.handleRequest(res, async () => {
      let submissions =
        req.user.type === 1
          ? await problemRepository.getAllVersions(req.params.id)
          : req.user.type === 0
          ? await submissionRepository.getAllSubmissionsByUserAndProblem(
              req.user.userId,
              req.params.id
            )
          : await submissionRepository.getAllSubmissionsByProblem(
              req.params.id
            );
      res.status(200).send(submissions);
    });
  };

  getAllVersions = async (req, res) => {
    this.handleRequest(res, async () => {
      let versions = await problemRepository.getAllVersions(req.params.id);
      res.status(200).send(versions);
    });
  };
  // takeNthHint = async (req, res) => {};
  // rateProblem = async (req, res) => {};
  // getProblemRating = async (req, res) => {};
  // getProblemAvgRating = async (req, res) => {};

  recentlyUpdatedProblems = async (req, res) => {
    console.log("recentlyUpdatedProblems", req.user.userId);
    this.handleRequest(res, async () => {
      let problems = await problemRepository.getRecentlyUpdatedProblems(req.user.userId);
      if(problems.success){
        res.status(200).json(problems.data);
      }
      else{
        res.status(400).json(problems);
      }
    });
  }
}

module.exports = ProblemController;
