import SubmissionApi from "../api/submissionApi";
import Controller from "./base";
import { showToast } from "../App";

class SubmissionController extends Controller {
  submissionApi = new SubmissionApi();
  submitSolution = async (json, verdict, problemId) => {
    const res = await this.submissionApi.submitSolution(
      json,
      verdict,
      problemId
    );
    return res;
  };
  getAllSubmissionsByUserAndProblem = async (problemId) => {
    const res =
      await this.submissionApi.getAllSubmissionsByUserAndProblem(problemId);
    return res;
  };
}

export default SubmissionController;