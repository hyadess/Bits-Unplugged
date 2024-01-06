const Controller = require("./base");
const UserActivityRepository = require("../repository/userActivityRepository");
const userActivityRepository = new UserActivityRepository();
class UserActivityController extends Controller {
  constructor() {
    super();
  }
  updateOnFailedAttempt = async (req, res) => {
    let result = await userActivityRepository.updateOnFailedAttempt(
      req.body.user_id,req.params.problem_id
    );
    this.handleResponse(result, res);

  };
  
  updateOnSuccessfulAttempt = async (req, res) => {
    let result = await userActivityRepository.updateOnSuccessfulAttempt(
      req.body.user_id,req.params.problem_id
    );
    this.handleResponse(result, res);

  };

  //new ones......
  
  totalFailedAttempts = async (req, res) => {
    let result = await userActivityRepository.totalFailedAttempts();
    this.handleResponse(result, res);
  };
  totalSuccessfulAttempts = async (req, res) => {
    let result = await userActivityRepository.totalSuccessfulAttempts();
    this.handleResponse(result, res);
  };

  totalSolvedProblemsByUser = async (req, res) => {
    let result = await userActivityRepository.totalSolvedProblemsByUser(req.body.user_id);
    this.handleResponse(result, res);
  };
  totalFailedAttemptsByUser = async (req, res) => {
    let result = await userActivityRepository.totalFailedAttemptsByUser(req.body.user_id);
    this.handleResponse(result, res);
  };
  
  totalSuccessfulAttemptsBySeries = async (req, res) => {
    let result = await userActivityRepository.totalSuccessfulAttemptsBySeries(req.params.series_id);
    this.handleResponse(result, res);
  };
  totalFailedAttemptsBySeries = async (req, res) => {
    let result = await userActivityRepository.totalFailedAttemptsBySeries(req.params.series_id);
    this.handleResponse(result, res);
  };

}

module.exports = UserActivityController;
