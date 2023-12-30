import Api from "./base";

class SubmissionApi extends Api{

    submitSolution = async (verdict,problem_id) => {
        return await this.post("/submission/"+problem_id+"/saveSubmit", {
          verdict: verdict,
        });
    };
    getAllSubmissionsByUserAndProblem = async (problem_id) => {
        //console.log(problem_id);
        return await this.get("/submission/"+problem_id);
    };


}

export default SubmissionApi;