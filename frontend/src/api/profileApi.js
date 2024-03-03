import Api from "./base";

class ProfileApi extends Api {
  getProfile = async () => {
    return await this.get("/profile");
  };

  getIdByUsername = async (username) => {
    return await this.get(`/profile/getId/${username}`);
  }
  getProfileByUsername = async (username) => {
    return await this.get(`/profile/${username}`);
  };
  searchProfileByQuery = async (seachQuery) => {
    return await this.get(`/profile/search/${seachQuery}`);
  };
}
export default ProfileApi;
