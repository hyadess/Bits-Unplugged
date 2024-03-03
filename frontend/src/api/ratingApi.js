import Api from "./base";

class RatingApi extends Api {
  getRating = async (userId) => {
    return await this.get("/ratings/current/"+userId);
  };
  getRatingHistory = async (userId) => {
    return await this.get("/ratings/history/"+userId);
  };
  updateAllUserRating = async (contestId) => {
    return await this.post("/ratings/updateAllUserRating/"+contestId);
  };
}

export default RatingApi;
