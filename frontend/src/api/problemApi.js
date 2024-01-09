import Api from "./base";

class ProblemApi extends Api {
  getAllProblems = async () => {
    return await this.get("/problem");
  };
  getSubmittedProblems = async () => {
    return await this.get("/problem/submitted");
  };
  getMyProblems = async () => {
    return await this.get("/problem/created");
  };
  getProblemsBySeries = async (seriesId) => {
    return await this.get("/problem/by_series/" + seriesId);
  };
  getUnsolvedProblemsBySeries = async (seriesId) => {
    return await this.get("/problem/by_series/unsolved/" + seriesId);
  };
  getProblemById = async (problemId) => {
    return await this.get("/problem/" + problemId);
  };
  addProblem = async (title) => {
    return await this.post("/problem/", {
      title: title,
    });
  };
  updateTitle = async (problemId, title) => {
    return await this.put("/problem/" + problemId + "/title", {
      title: title,
    });
  };
  updateSeries = async (problemId, seriesId) => {
    return await this.put("/problem/" + problemId + "/series", {
      seriesId: seriesId,
    });
  };
  updateSerial = async (problemId, serialNo) => {
    return await this.put("/problem/" + problemId + "/serial", {
      serialNo: serialNo,
    });
  };
  updateStatement = async (problemId, statement) => {
    return await this.put("/problem/" + problemId + "/statement", {
      statement: statement,
    });
  };
  updateCanvas = async (
    problemId,
    canvasId,
    canvasData,
    params,
    uiParams,
    controlParams
  ) => {
    return await this.put("/problem/" + problemId + "/canvas", {
      canvasId: canvasId,
      canvasData: canvasData,
      params: params,
      uiParams: uiParams,
      controlParams: controlParams,
    });
  };
  updateSolutionChecker = async (problemId, solutionChecker, type) => {
    return await this.put("/problem/" + problemId + "/solutionChecker", {
      solutionChecker: solutionChecker,
      checker_type: type,
    });
  };
  deleteProblem = async (problemId) => {
    return await this.delete("/problem/" + problemId);
  };
  publishProblem = async (problemId) => {
    return await this.post("/problem/" + problemId + "/publish", {});
  };
  submitProblem = async (problemId) => {
    return await this.post("/problem/" + problemId + "/submit", {});
  };
  unpublishProblem = async (problemId) => {
    return await this.post("/problem/" + problemId + "/unpublish", {});
  };
}
export default ProblemApi;
