import Api from "./base";

class SubmissionApi extends Api {
  submitSolution = async (json, verdict, problemId,duration) => {
    return await this.post("/submissions/" + problemId + "/saveSubmit", {
      ansJson: json,
      verdict: verdict,
      duration: duration,

    });
  };
  getAllSubmissionsByUserAndProblem = async (problemId) => {
    //console.log(problemId);
    return await this.get("/problems/" + problemId + "/submissions");
  };
  getAllSubmissionsByUser =async () =>{
    return await this.get("/submissions/");
  }
}

export default SubmissionApi;
