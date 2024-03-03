import Api from "./base";

class RatingApi extends Api {
  getRating = async (userId) => {
    return await this.get("/ratings/"+userId+"/current");
  };
  getRatingHistory = async (userId) => {
    return await this.get("/ratings/"+userId+"/history");
  };
  updateAllUserRating = async (contestId) => {
    return await this.post("/ratings/updateAllUserRating", { contestId });
  };
}

export default RatingApi;
