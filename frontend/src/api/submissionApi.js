import Api from "./base";

class SubmissionApi extends Api {
  submitSolution = async (json, verdict, problemId, duration, image) => {
    return await this.post("/submissions/" + problemId + "/saveSubmit", {
      canvasData: json,
      verdict: verdict,
      duration: duration,
      image: image,
    });
  };
  getAllSubmissionsByUserAndProblem = async (problemId) => {
    //console.log(problemId);
    return await this.get("/problems/" + problemId + "/submissions");
  };
  getAllSubmissionsByUser = async (username) => {
    return await this.get("/submissions/" + username + "/all");
  };
}

export default SubmissionApi;
