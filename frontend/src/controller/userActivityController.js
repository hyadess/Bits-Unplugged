import UserActivityApi from "../api/userActivityApi";
import Controller from "./base";
import { showToast } from "../App";

class UserActivityController extends Controller {
  userActivityApi = new UserActivityApi();
  updateOnSuccessfulAttempt = async (problemId) => {
    const res = await this.userActivityApi.updateOnSuccessfulAttempt(problemId);
    return res;
  };
  updateOnFailedAttempt = async (problemId) => {
    const res = await this.userActivityApi.updateOnFailedAttempt(problemId);
    return res;
  };
}

export default UserActivityController;