const Controller = require("./base");
const RatingRepository = require("../repositories/ratingRepository");
const ratingRepository = new RatingRepository();

class RatingController extends Controller{
    constructor(){
        super();
    }

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
                    let newRating=800;
                    userActivity.forEach((activity)=>{
                        const userRating=activity.rating;
                        const dif=newRating-userRating;
                        const att=activity.successful_submissions-activity.failed_submissions;
                        if(dif<0)
                        {
                            if(att<0)
                            {
                                newRating+=Math.floor(dif*att);
                            }
                            else{
                                newRating+=Math.floor(-att*100/dif);
                            }
                        }
                        else if(dif>0)
                        {
                            if(att<0)
                            {
                                newRating+=Math.floor(-dif*att);
                            }
                            else{
                                newRating+=Math.floor(-att*100/dif);
                            }
                        }
                        else{
                            if(att<0)
                            {
                                newRating+=Math.floor(-att*100);
                            }
                            else{
                                newRating+=Math.floor(att*100);
                            }
                        }
                        
                    });

                    console.log(problem.id,problem.rating,newRating)
                    const res=await ratingRepository.updateProblemRating(problem.id,newRating);
                    if(!res.success) flag=false;

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