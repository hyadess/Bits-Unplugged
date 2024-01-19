import ProfileApi from "../api/profileApi";
import Controller from "./base";

class ProfileController extends Controller {
  profileApi = new ProfileApi();
}
export default ProfileController;
