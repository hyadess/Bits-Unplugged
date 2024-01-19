import Api from "./base";

class ProblemApi extends Api {
  getAllProblems = async () => {
    return await this.get("/problem");
  };
  getSubmittedProblems = async () => {
    return await this.get("/problem");
  };
  getMyProblems = async () => {
    return await this.get("/problem/created");
  };
  getProblemsBySeries = async (seriesId) => {
    return await this.get("/series/" + seriesId + "/problems");
  };
  getUnsolvedProblemsBySeries = async (seriesId) => {
    return await this.get("/series/" + seriesId + "/problems", {
      solved: false,
    });
  };
  getProblemById = async (problemId) => {
    return await this.get("/problem/" + problemId);
  };
  createProblem = async (title) => {
    return await this.post("/problem/", {
      title: title,
    });
  };
  updateProblem = async (problemId, data) => {
    return await this.put("/problem/" + problemId, data);
  };
  deleteProblem = async (problemId) => {
    return await this.delete("/problem/" + problemId);
  };
  submitProblem = async (problemId) => {
    return await this.post("/problem/" + problemId + "/submit", {});
  };
  trackDuration = async (problemId, time) => {
    return await this.put("/userActivity/" + problemId + "/track-duration", {
      duration: time,
    });
  };
}
export default ProblemApi;
