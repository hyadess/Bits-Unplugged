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
  getUnsolvedProblemsBySeries = async (seriesId) => {
    const res = await this.problemApi.getUnsolvedProblemsBySeries(seriesId);
    return res;
  };
  getProblemsBySeries = async (seriesId) => {
    const res = await this.problemApi.getProblemsBySeries(seriesId);
    return res;
  };
  getProblemById = async (problemId) => {
    const res = await this.problemApi.getProblemById(problemId);
    return res;
  };
  createProblem = async (title) => {
    const res = await this.problemApi.createProblem(title);
    return res;
  };
  updateTitle = async (problemId, title) => {
    const res = await this.problemApi.updateTitle(problemId, title);
    return res;
  };
  updateSeries = async (problemId, seriesId) => {
    const res = await this.problemApi.updateSeries(problemId, seriesId);
    return res;
  };
  updateSerial = async (problemId, serialNo) => {
    const res = await this.problemApi.updateSerial(problemId, serialNo);
    return res;
  };
  updateStatement = async (problemId, statement) => {
    const res = await this.problemApi.updateStatement(problemId, statement);
    return res;
  };
  updateCanvas = async (
    problemId,
    canvasId,
    canvasData,
    params,
    previewOptions
  ) => {
    const res = await this.problemApi.updateCanvas(
      problemId,
      canvasId,
      canvasData,
      params,
      previewOptions
    );
    return res;
  };

  deleteProblem = async (problemId) => {
    const res = await this.problemApi.deleteProblem(problemId);
    return res;
  };

  submitProblem = async (problemId) => {
    const res = await this.problemApi.submitProblem(problemId);
    return res;
  };

  publishProblem = async (problemId) => {
    // Submitted by problem setter vs Live
    const res = await this.problemApi.publishProblem(problemId);
    return res;
  };

  unpublishProblem = async (problemId) => {
    const res = await this.problemApi.unpublishProblem(problemId);
    return res;
  };

  checkWithCode = async (code, input) => {
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
  checkSolution = async (checkerCode, checkerCanvas, input) => {
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
        checkerCode + "; solutionChecker(input,checkerCanvas);"
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

  updateSolutionChecker = async (problemId, solutionChecker, checker_type) => {
    const res = await this.problemApi.updateSolutionChecker(
      problemId,
      solutionChecker,
      checker_type
    );
    return res;
  };

  trackDuration = async (problemId, time) => {
    const res = await this.problemApi.trackDuration(problemId, time);
    return res;
  };
}
export default ProblemController;

/**
 * Usage:
 * import ProblemController from "./controller/problemController";
 * const problemController = new ProblemController();
 * await problemController.getProblemsBySeries(seriesId);
 */
