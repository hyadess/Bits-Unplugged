import Api from "./base";

class ProblemApi extends Api {
  getAllProblems = async () => {
    return await this.get("/problems");
  };
  getSubmittedProblems = async () => {
    return await this.get("/problems");
  };
  getMyProblems = async () => {
    return await this.get("/problems/created");
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
    return await this.get("/problems/" + problemId);
  };
  createProblem = async (title) => {
    return await this.post("/problems/", {
      title: title,
    });
  };
  updateProblem = async (problemId, data) => {
    return await this.put("/problems/" + problemId, data);
  };
  deleteProblem = async (problemId) => {
    return await this.delete("/problems/" + problemId);
  };
  submitProblem = async (problemId) => {
    return await this.post("/problems/" + problemId + "/submit", {});
  };
  trackDuration = async (problemId, time) => {
    return await this.put("/userActivity/" + problemId + "/track-duration", {
      duration: time,
    });
  };
  cloneProblem = async (problemId) => {
    return await this.post("/problems/" + problemId + "/clone");
  };
}
export default ProblemApi;
