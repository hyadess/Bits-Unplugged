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

}

module.exports = UserActivityController;
