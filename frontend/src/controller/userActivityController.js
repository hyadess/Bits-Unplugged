import UserActivityApi from "../api/userActivityApi";
import Controller from "./base";
import { showToast } from "../App";

class UserActivityController extends Controller{
    userActivityApi=new UserActivityApi();
    updateOnSuccessfulAttempt = async (problem_id) => {
        const res = await this.userActivityApi.updateOnSuccessfulAttempt(problem_id);
        return res;
    };
    updateOnFailedAttempt = async (problem_id) => {
        const res = await this.userActivityApi.updateOnFailedAttempt(problem_id);
        return res;
    };



}

export default UserActivityController;