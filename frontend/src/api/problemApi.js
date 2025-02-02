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
  getContestProblemById = async (problemId) => {
    return await this.get("/problems/" + problemId + "/contestproblem");
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
  approveProblem = async (problemId) => {
    return await this.put("/problems/" + problemId + "/approve");
  };
  rejectProblem = async (problemId, feedback) => {
    return await this.put("/problems/" + problemId + "/reject", {
      feedback: feedback,
    });
  };
  getAllVersions = async (problemId) => {
    return await this.get("/problems/" + problemId + "/versions");
  };
  getRecommendations = async () => {
    return await this.get("/problems/recommendation");
  };

  getRecentyUpdatedProblems = async () => {
    return await this.get("/problems/setter/recentUpdate");
  };
}
export default ProblemApi;
