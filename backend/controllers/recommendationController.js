const Controller = require("./base");

const UserActivityRepository = require("../repositories/userActivityRepository");
const userActivityRepository = new UserActivityRepository();
const RecommendationRepository = require("../repositories/recommendationRepository");
const recommendationRepository = new RecommendationRepository();
const SeriesRepository = require("../repositories/seriesRepository");
const seriesRepository = new SeriesRepository();
const RatingRepository = require("../repositories/ratingRepository");
const ratingRepository = new RatingRepository();

class RecommendationController extends Controller{
    constructor(){
        super();
    }

    //series hunter...........recommendation using series info.......................

    getFavoriteSeries = async (userId) => {
        const r1=await userActivityRepository.totalFailedAttemptsByUser(userId);
        const r2=await userActivityRepository.totalSolvedProblemsByUser(userId);
        console.log("r1",r1);
        if(!r1.success || !r2.success){
            console.log("error");
            return [];
        }

        const combinedList = r1.data.map(r1_item => {
            const isPresent = r2.data.find(r2_item => r2_item.id === r1_item.id);
            const totalAttempts = parseInt(r1_item.totalFailedAttemptsPerSeries || 0) + parseInt(isPresent ? isPresent.totalSuccessfulAttemptsPerSeries : 0);
            return {
                id: r1_item.id,
                name: r1_item.name,
                totalAttempts: totalAttempts
            };
        });
        const sortedList = combinedList.sort((a, b) => b.totalAttempts - a.totalAttempts);

        //console.log("series list",sortedList);

        return sortedList;


    };

    getFamousProblemsBySeries = async (seriesId) => {
        const result=await recommendationRepository.getFamousProblemsBySeries(seriesId);

        if(!result.success){
            return [];
        }
        else{
            return result.data;
        }
    };

    getRecommendationBySeries = async (req,res) => {
        let result=[];
        result=await this.getFavoriteSeries(req.user.userId);
        //console.log("result 1",result);
        if(result.length===0){
            const r=await seriesRepository.getAllSeries();
            if(r){
                result=r;     
            }
            else
            {
                res.status(404).json(r);
            }
            
        }
        //console.log("result 2",result);
        if(result.length===0){
            res.status(404).json({success:false,message:"No series found"});
        }

        let problems=[];
        for(let i=0;i<result.length;i++){
            const r=await this.getFamousProblemsBySeries(result[i].id);
           // console.log("r",r);
            problems.push(r);
        }
        //console.log("problems",problems);
        res.status(200).json({success:true,data:problems});



    };





    // rating burner....................recommendation using user rating.......................



    getRecommendationByRating = async (req,res) => {
        const userId=req.user.userId;
        const userRating=await ratingRepository.getCurrentRating(userId);
        if(!userRating.success){
            res.status(404).json(userRating);
        }
        console.log("user rating",userRating);
        const userRatingValue=userRating.data[0].rating;
        
        const result=await recommendationRepository.getUnsolvedProblemAroundRating(req.user.userId,userRatingValue);
        if(!result.success){
            res.status(404).json(result);
        }
        res.status(200).json(result.data);
    }

    













};
module.exports = RecommendationController;