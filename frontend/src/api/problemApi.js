import Api from "./base";

class ProblemApi extends Api {
  getMyProblems = async () => {
    return await this.get("/problem/created");
  };
  getProblemsByAlgo = async (algo_id) => {
    return await this.get("/problem/by_algo/" + algo_id);
  };
  getProblemById = async (problem_id) => {
    return await this.get("/problem/" + problem_id);
  };
  addProblem = async (algo_id) => {
    return await this.post("/problem/", {
      algo_id: algo_id,
    });
  };
  updateTitle = async (problem_id, title) => {
    return await this.put("/problem/" + problem_id + "/title", {
      title: title,
    });
  };
  updateStatement = async (problem_id, statement) => {
    return await this.put("/problem/" + problem_id + "/statement", {
      statement: statement,
    });
  };
  updateCanvas = async (problem_id, canvas_data) => {
    return await this.put("/problem/" + problem_id + "/canvas", {
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
}
export default ProblemApi;
