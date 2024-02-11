const Controller = require("./base");
const SubmissionRepository = require("../repositories/submissionRepository");
const ProblemRepository=require("../repositories/problemRepository");
const UserActivityRepository = require("../repositories/userActivityRepository");
const userActivityRepository = new UserActivityRepository();
const submissionRepository = new SubmissionRepository();
const problemRepository=new ProblemRepository();
class SubmissionController extends Controller {
  constructor() {
    super();
  }
  getAllSubmissionsByUserAndProblem = async (req, res) => {
    this.handleRequest(res, async () => {
      const submissions =
        await submissionRepository.getAllSubmissionsByUserAndProblem(
          req.user.userId,
          req.params.problemId
        );
      res.status(200).send(submissions);
    });
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
    this.handleRequest(res, async () => {
      const durationTrack= await userActivityRepository.trackDuration(
        req.user.userId,
        req.params.problemId,
        req.body.duration
      );

      if(req.body.verdict === "Accepted"){
        const userActivity= await userActivityRepository.updateOnSuccessfulAttempt(
          req.user.userId,
          req.params.problemId
        );
      } else if(req.body.verdict === "Wrong answer"){
        const userActivity= await userActivityRepository.updateOnFailedAttempt(
          req.user.userId,
          req.params.problemId
        );
      }
  
      const submission = await submissionRepository.submitSolution(
        req.user.userId,
        req.params.problemId,
        req.body
      );
      res.status(201).json(submission);
    });
  };

  // checkSolution = async (req, res) => {};
  // rateUser = async (req, res) => {};
}

module.exports = SubmissionController;
