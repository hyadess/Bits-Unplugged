import ProfileApi from "../api/profileApi";
import Controller from "./base";

class ProfileController extends Controller {
  profileApi = new ProfileApi();
  getProfile = async () => {
    const res = await this.profileApi.getProfile();
    return res;
  };
}
export default ProfileController;
