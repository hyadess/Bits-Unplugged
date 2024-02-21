import Api from "./base";

class ProfileApi extends Api {
  getProfile = async () => {
    return await this.get("/profile");
  };
  getProfileByUsername = async (username) => {
    return await this.get(`/profile/${username}`);
  };
}
export default ProfileApi;
