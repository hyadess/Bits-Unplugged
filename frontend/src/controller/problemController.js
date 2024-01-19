import ProblemApi from "../api/problemApi";
import Controller from "./base";
import { showToast } from "../App";

class ProblemController extends Controller {
  problemApi = new ProblemApi();

  submitProblem = async (problemId) => {
    const res = await this.problemApi.submitProblem(problemId);
    if (res.success) {
      this.showSuccess("Problem submitted for approval", res);
    }
    return res;
  };

  checkSolution = async (
    checkerCode,
    checkerCanvas,
    canvasData,
    activityData
  ) => {
    const stdout = [];
    const originalConsoleLog = console.log;
    console.log = function (...args) {
      const stringifiedArgs = args
        .map((arg) => JSON.stringify(arg, null, "\t"))
        .join(" ");
      stdout.push(stringifiedArgs);
    };

    let output = "";
    try {
      const verdict = eval(
        checkerCode +
          "; solutionChecker(canvasData,checkerCanvas,activityData);"
      );
      console.log = originalConsoleLog;
      if (verdict) {
        output = "Accepted";
        showToast(output, "success");
      } else {
        output = "Wrong answer";
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
}
export default ProblemController;

/**
 * Usage:
 * import ProblemController from "./controller/problemController";
 * const problemController = new ProblemController();
 * await problemController.getProblemsBySeries(seriesId);
 */
