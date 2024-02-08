import Api from "./base";

class UserActivityApi extends Api {
  updateOnSuccessfulAttempt = async (problemId) => {
    return await this.post("/userActivity/" + problemId + "/successAttempt");
  };
  updateOnFailedAttempt = async (problemId) => {
    return await this.post("/userActivity/" + problemId + "/failedAttempt");
  };
  totalSolvedProblemsByUser =async() =>{
    return await this.get("/userActivity/stat/series/successes/me");
  };
  successesByUser =async() =>{
    return await this.get("/userActivity/stat/successes/me");
  };
  successesByProblem =async(problemId) =>{
    return await this.get("/userActivity/stat/successes/"+problemId);
  };
  totalFailedProblemsByUser =async() =>{
    return await this.get("/userActivity/stat/fails/me");
  };
  mostRecentFailsByUser =async() =>{
    return await this.get("/userActivity/stat/recentfails/me");
  };
  totalSolvedProblemCountByTopic =async(topicId) =>{
    return await this.get("/userActivity/stat/"+topicId+"/solvedProblems");
  };
  totalProblemCountByTopic =async(topicId) =>{
    //console.log(topicId);
    return await this.get("/userActivity/stat/"+topicId+"/problems");
  };
  daywiseActivityByUser =async() =>{
    return await this.get("/userActivity/stat/activetime");
  };



  acceptanceByProblem =async(problemId) =>{
    return await this.get("/userActivity/"+problemId+"/acceptance");
  };


  //daily activity stat................................

  recentlyViewedProblems =async() =>{
    return await this.get("/userActivity/stat/recentViews");
  };


}

export default UserActivityApi;