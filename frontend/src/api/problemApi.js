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
  getProblemsBySeries = async (series_id) => {
    return await this.get("/problem/by_series/" + series_id);
  };
  getProblemById = async (problem_id) => {
    return await this.get("/problem/" + problem_id);
  };
  addProblem = async (title) => {
    return await this.post("/problem/", {
      title: title,
    });
  };
  updateTitle = async (problem_id, title) => {
    return await this.put("/problem/" + problem_id + "/title", {
      title: title,
    });
  };
  updateSeries = async (problem_id, series_id) => {
    return await this.put("/problem/" + problem_id + "/series", {
      series_id: series_id,
    });
  };
  updateStatement = async (problem_id, statement) => {
    return await this.put("/problem/" + problem_id + "/statement", {
      statement: statement,
    });
  };
  updateCanvas = async (problem_id, canvas_id, canvas_data) => {
    return await this.put("/problem/" + problem_id + "/canvas", {
      canvas_id: canvas_id,
      canvas_data: canvas_data,
    });
  };
  updateSolutionChecker = async (problem_id, code) => {
    return await this.put("/problem/" + problem_id + "/solution_checker", {
      solution_checker: code,
    });
  };
  deleteProblem = async (problem_id) => {
    return await this.delete("/problem/" + problem_id);
  };
  publishProblem = async (problem_id) => {
    return await this.post("/problem/" + problem_id + "/publish", {});
  };
  submitProblem = async (problem_id) => {
    return await this.post("/problem/" + problem_id + "/submit", {});
  };
  unpublishProblem = async (problem_id) => {
    return await this.post("/problem/" + problem_id + "/unpublish", {});
  };
}
export default ProblemApi;
