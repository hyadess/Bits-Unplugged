const Controller = require("./base");
const UserActivityRepository = require("../repositories/userActivityRepository");
const userActivityRepository = new UserActivityRepository();
class UserActivityController extends Controller {
  constructor() {
    super();
  }

  trackDuration = async (req, res) => {
    this.handleRequest(res, async () => {
      if (req.user.type != 0) res.status(204).json();
      let activity = await userActivityRepository.trackDuration(
        req.user.userId,
        req.params.problemId,
        req.body.duration
      );
      res.status(201).json(activity);
    });
  };

  updateOnFailedAttempt = async (req, res) => {
    this.handleRequest(res, async () => {
      let activity = await userActivityRepository.updateOnFailedAttempt(
        req.user.userId,
        req.params.problemId
      );
      res.status(201).json(activity);
    });
  };

  updateOnSuccessfulAttempt = async (req, res) => {
    let result = await userActivityRepository.updateOnSuccessfulAttempt(
      req.user.userId,
      req.params.problemId
    );
    if (result.success) {
      res.status(204).json(result.data);
    } else {
      res.status(404).json(result);
    }
  };

  //new ones......

  totalFailedAttempts = async (req, res) => {
    let result = await userActivityRepository.totalFailedAttempts();
    if (result.success) {
      res.status(200).json(result.data);
    } else {
      res.status(404).json(result);
    }
  };
  totalSuccessfulAttempts = async (req, res) => {
    let result = await userActivityRepository.totalSuccessfulAttempts();
    if (result.success) {
      res.status(200).json(result.data);
    } else {
      res.status(404).json(result);
    }
  };

  totalSolvedProblemsByUser = async (req, res) => {
    let result = await userActivityRepository.totalSolvedProblemsByUser(
      req.user.userId
    );
    if (result.success) {
      res.status(200).json(result.data);
    } else {
      res.status(404).json(result);
    }
  };
  totalFailedAttemptsByUser = async (req, res) => {
    let result = await userActivityRepository.totalFailedAttemptsByUser(
      req.user.userId
    );
    if (result.success) {
      res.status(200).json(result.data);
    } else {
      res.status(404).json(result);
    }
  };

  totalSuccessfulAttemptsBySeries = async (req, res) => {
    let result = await userActivityRepository.totalSuccessfulAttemptsBySeries(
      req.params.seriesId
    );
    if (result.success) {
      res.status(200).json(result.data);
    } else {
      res.status(404).json(result);
    }
  };
  totalFailedAttemptsBySeries = async (req, res) => {
    let result = await userActivityRepository.totalFailedAttemptsBySeries(
      req.params.seriesId
    );
    if (result.success) {
      res.status(200).json(result.data);
    } else {
      res.status(404).json(result);
    }
  };
}

module.exports = UserActivityController;