import Api from "./base";

class SubmissionApi extends Api {
  submitSolution = async (json, verdict, problemId) => {
    return await this.post("/submissions/" + problemId + "/saveSubmit", {
      ansJson: json,
      verdict: verdict,
    });
  };
  getAllSubmissionsByUserAndProblem = async (problemId) => {
    //console.log(problemId);
    return await this.get("/problems/" + problemId + "/submissions");
  };
}

export default SubmissionApi;
