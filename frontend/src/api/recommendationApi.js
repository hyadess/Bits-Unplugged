import Api from "./base";


class RecommendationApi extends Api{

    getRecommendationbySeries = async () => {
        return await this.get("/recommendations/favoriteSeries");
    }
    getRecommendationByRating = async () => {
        return await this.get("/recommendations/rating");
    }






}


export default RecommendationApi;