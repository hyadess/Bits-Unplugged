import Api from "./base";

class ProfileApi extends Api {
  getProfile = async () => {
    return await this.get("/profile");
  };
}
export default ProfileApi;
