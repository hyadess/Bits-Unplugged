const Controller = require("./base");
const UserActivityRepository = require("../repository/userActivityRepository");
const userActivityRepository = new UserActivityRepository();
class UserActivityController extends Controller {
  constructor() {
    super();
  }
  updateOnFailedAttempt = async (req, res) => {
    let result = await userActivityRepository.updateOnFailedAttempt(
      req.user.user_id,
      req.params.problem_id
    );
    if (result.success) {
      res.status(204).json(result.data);
    } else {
      res.status(404).json(result);
    }
  };

  updateOnSuccessfulAttempt = async (req, res) => {
    let result = await userActivityRepository.updateOnSuccessfulAttempt(
      req.user.user_id,
      req.params.problem_id
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
      req.user.user_id
    );
    if (result.success) {
      res.status(200).json(result.data);
    } else {
      res.status(404).json(result);
    }
  };
  totalFailedAttemptsByUser = async (req, res) => {
    let result = await userActivityRepository.totalFailedAttemptsByUser(
      req.user.user_id
    );
    if (result.success) {
      res.status(200).json(result.data);
    } else {
      res.status(404).json(result);
    }
  };

  totalSuccessfulAttemptsBySeries = async (req, res) => {
    let result = await userActivityRepository.totalSuccessfulAttemptsBySeries(
      req.params.series_id
    );
    if (result.success) {
      res.status(200).json(result.data);
    } else {
      res.status(404).json(result);
    }
  };
  totalFailedAttemptsBySeries = async (req, res) => {
    let result = await userActivityRepository.totalFailedAttemptsBySeries(
      req.params.series_id
    );
    if (result.success) {
      res.status(200).json(result.data);
    } else {
      res.status(404).json(result);
    }
  };
}

module.exports = UserActivityController;
