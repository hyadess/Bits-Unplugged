import Api from "./base";

class UserActivityApi extends Api {
  updateOnSuccessfulAttempt = async (problemId) => {
    return await this.post("/userActivity/" + problemId + "/successAttempt");
  };
  updateOnFailedAttempt = async (problemId) => {
    return await this.post("/userActivity/" + problemId + "/failedAttempt");
  };
}

export default UserActivityApi;