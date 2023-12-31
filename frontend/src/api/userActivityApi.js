import Api from "./base";

class UserActivityApi extends Api{

    updateOnSuccessfulAttempt = async (problem_id) => {
        return await this.post("/userActivity/"+problem_id+"/successAttempt");
    };
    updateOnFailedAttempt = async (problem_id) => {
        return await this.post("/userActivity/"+problem_id+"/failedAttempt");
    };


}

export default UserActivityApi;