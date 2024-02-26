const Controller = require("./base");

const UserActivityRepository = require("../repositories/userActivityRepository");
const userActivityRepository = new UserActivityRepository();


class RecommendationController extends Controller{
    constructor(){
        super();
    }

    //userRating affecting problem rating..........................

    getUserRatingsAndAttemptsByProblem = async (problemId) => {
        const result = await ratingRepository.getUserRatingsAndAttemptsByProblem(problemId);
        if(result.success){
           // console.log(result.data);
            return result.data;
        }
        else{
            return null;
        }
    };

};
module.exports = RecommendationController;