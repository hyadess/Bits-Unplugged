import UserActivityApi from "../api/userActivityApi";
import Controller from "./base";
import { showToast } from "../App";

class UserActivityController extends Controller {
  userActivityApi = new UserActivityApi();
}

export default UserActivityController;