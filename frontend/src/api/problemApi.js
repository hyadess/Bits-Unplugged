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
  updateTitle = async (problemId, title) => {
    return await this.put("/problem/" + problemId, {
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
    return await this.put("/problem/" + problemId, {
      statement: statement,
    });
  };
  updateCanvas = async (
    problemId,
    canvasId,
    canvasData,
    editOptions,
    previewOptions
  ) => {
    return await this.put("/problem/" + problemId, {
      canvasId: canvasId,
      canvasData: canvasData,
      editOptions: editOptions,
      previewOptions: previewOptions,
    });
  };
  updateSolutionChecker = async (problemId, solutionChecker, type) => {
    return await this.put(
      "/problem/" + problemId,
      type == 0
        ? {
            checkerCode: solutionChecker,
          }
        : {
            checkerCanvas: solutionChecker,
          }
    );
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
  trackDuration = async (problemId, time) => {
    return await this.put("/userActivity/" + problemId + "/track-duration", {
      duration: time,
    });
  };
}
export default ProblemApi;
