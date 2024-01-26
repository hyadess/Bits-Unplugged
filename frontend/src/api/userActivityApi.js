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

}

export default UserActivityApi;