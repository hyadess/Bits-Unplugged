import ProblemApi from "../api/problemApi";
import Controller from "./base";
import { showToast } from "../App";

class ProblemController extends Controller {
  problemApi = new ProblemApi();

  /**
   * For Problem Setter
   */
  getAllProblems = async () => {
    const res = await this.problemApi.getAllProblems();
    return res;
  };
  getSubmittedProblems = async () => {
    const res = await this.problemApi.getSubmittedProblems();
    return res;
  };
  getMyProblems = async () => {
    const res = await this.problemApi.getMyProblems();
    return res;
  };
  getProblemsBySeries = async (series_id) => {
    const res = await this.problemApi.getProblemsBySeries(series_id);
    return res;
  };
  getProblemById = async (problem_id) => {
    const res = await this.problemApi.getProblemById(problem_id);
    return res;
  };
  addProblem = async (title) => {
    const res = await this.problemApi.addProblem(title);
    return res;
  };
  updateTitle = async (problem_id, title) => {
    const res = await this.problemApi.updateTitle(problem_id, title);
    return res;
  };
  updateSeries = async (problem_id, series_id) => {
    const res = await this.problemApi.updateSeries(problem_id, series_id);
    return res;
  };
  updateStatement = async (problem_id, statement) => {
    const res = await this.problemApi.updateStatement(problem_id, statement);
    return res;
  };
  updateCanvas = async (problem_id, canvas_id, canvas_data) => {
    const res = await this.problemApi.updateCanvas(
      problem_id,
      canvas_id,
      canvas_data
    );
    return res;
  };

  deleteProblem = async (problem_id) => {
    const res = await this.problemApi.deleteProblem(problem_id);
    return res;
  };

  submitProblem = async (problem_id) => {
    const res = await this.problemApi.submitProblem(problem_id);
    return res;
  };

  publishProblem = async (problem_id) => {
    // Submitted by problem setter vs Live
    const res = await this.problemApi.publishProblem(problem_id);
    return res;
  };

  unpublishProblem = async (problem_id) => {
    const res = await this.problemApi.unpublishProblem(problem_id);
    return res;
  };
  checkSolution = async (code, input) => {
    console.log(code);
    const stdout = [];
    const originalConsoleLog = console.log;
    console.log = function (...args) {
      stdout.push(args.join(" "));
    };

    let output = "";
    try {
      const verdict = eval(code + "; solutionChecker(input);");
      console.log = originalConsoleLog;
      if (verdict) {
        output = "Accepted.";
        showToast(output, "success");
      } else {
        output = "Wrong answer.";
        showToast(output, "error");
      }
    } catch (error) {
      console.log = originalConsoleLog;
      output = error.message;
      showToast(output, "error");
    }

    return {
      output: output,
      stdout: stdout,
    };
  };

  updateSolutionChecker = async (problem_id, code) => {
    const res = await this.problemApi.updateSolutionChecker(problem_id, code);
    return res;
  };
}
export default ProblemController;

/**
 * Usage:
 * import ProblemController from "./controller/problemController";
 * const problemController = new ProblemController();
 * await problemController.getProblemsBySeries(series_id);
 */
