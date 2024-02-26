const Controller = require("./base");
const RatingRepository = require("../repositories/ratingRepository");
const ratingRepository = new RatingRepository();

class RatingController extends Controller{
    constructor(){
        super();
    }
    //user rating table................
    getCurrentRating = async (req,res) => {
        const result = await ratingRepository.getCurrentRating(req.user.userId);
        if(result.success){
            res.status(200).json(result.data);
        }
        else{
            res.status(500).json(result);
        }
    };

    getRatingHistory = async (req,res) => {
        const result = await ratingRepository.getRatingHistory(req.user.userId);
        if(result.success){
            res.status(200).json(result.data);
        }
        else{
            res.status(500).json(result);
        }
    };

    updateRating = async (req,res) => {
        const result = await ratingRepository.updateRating(req.user.userId, req.body.newRating);
        if(result.success){
            res.status(202).json({message: "Rating updated successfully"});
        }
        else{
            res.status(500).json({message: "Rating update failed"});
        }
    };







    //userRating affecting problem rating.........................

    


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


    getLatestProblemsWithRatings = async () => {
        const result = await ratingRepository.getLatestProblemsWithRatings();
        if(result.success){
            ///console.log(result.data);
            return result.data;
        }
        else{
            return null;
        }

    };


    updateAllproblemRating = async (req,res) => {
        const problems=await this.getLatestProblemsWithRatings();
        let flag=true;
        if(problems.length>0){
            problems.forEach(async (problem)=>{
                const userActivity=await this.getUserRatingsAndAttemptsByProblem(problem.id);
                
                //console.log(userActivity);
                if(userActivity.length>0){
                    //console.log(problem.id,problem.rating,userActivity.length);
                    let newRating=0;
                    let sum=0;
                    userActivity.forEach((activity)=>{
                        const userRating=activity.rating;
                        console.log("userRating",userRating);
                        let dif=Math.abs(problem.rating-userRating);
                        const wa=activity.failed_submissions;
                        const duration=activity.duration;
                        console.log("wa and duration and dif",wa,duration,dif);
                        let cur=0.3*(800+wa*50)+0.7*(800+Math.max(duration-10,0))
                        console.log("cur",cur);
                        //cur=(3500.0-800.0) / (1.0 + Math.exp(-0.1 *cur))+800.0;
                        if(cur<800.0)
                        {
                            cur=800.0;
                        }
                        if(cur>3500.0)
                        {
                            cur=3500.0;
                        }

                        dif=4000-dif;
                        console.log("rating difference and cur",dif,cur);
                        sum+=dif;
                        newRating+=dif*cur;


                        
                    });
                    if(sum!=0)
                    {
                        newRating/=sum;
                        newRating=Math.round(newRating);
                        console.log(problem.id,problem.rating,newRating)
                        const res=await ratingRepository.updateProblemRating(problem.id,newRating);
                        if(!res.success) flag=false;

                    }
                        

                }
            })
        }
        // problems.forEach(async (problem)=>{
        //     console.log(problem.id,problem.rating);
        // }
        // )
        console.log(flag);
        if (flag) {
            res.status(202).json({message: "Rating updated successfully"});
          } else {
            res.status(500).json({ message: "Rating update failed" });
          }
       

    };



    // contest affecting user rating...............................

    
}
module.exports = RatingController;