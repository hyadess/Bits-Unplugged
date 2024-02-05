import Api from "./base";

class UserActivityApi extends Api {
  updateOnSuccessfulAttempt = async (problemId) => {
    return await this.post("/userActivity/" + problemId + "/successAttempt");
  };
  updateOnFailedAttempt = async (problemId) => {
    return await this.post("/userActivity/" + problemId + "/failedAttempt");
  };
  totalSolvedProblemsByUser =async() =>{
    return await this.get("/userActivity/stat/successes/me");
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
  getAllDailyActivitiesForLast30Days =async() =>{
    return await this.get("/userActivity/stat/activetime");
  };


}

export default UserActivityApi;