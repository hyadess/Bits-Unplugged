import Api from "./base";

class RatingApi extends Api {
  getRating = async () => {
    return await this.get("/ratings/currentRating");
  };
}

export default RatingApi;
