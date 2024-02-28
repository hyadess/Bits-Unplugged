import Api from "./base";

class RatingApi extends Api {
  getRating = async () => {
    return await this.get("/ratings/currentRating");
  };
  updateAllUserRating = async (contestId) => {
    return await this.post("/ratings/updateAllUserRating", { contestId });
  };
}

export default RatingApi;
