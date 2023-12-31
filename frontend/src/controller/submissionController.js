import SubmissionApi from "../api/submissionApi";
import Controller from "./base";
import { showToast } from "../App";

class SubmissionController extends Controller{
    submissionApi=new SubmissionApi();
    submitSolution = async (verdict,problem_id) => {
        const res = await this.submissionApi.submitSolution(verdict,problem_id);
        return res;
    };
    getAllSubmissionsByUserAndProblem = async (problem_id) => {
        const res = await this.submissionApi.getAllSubmissionsByUserAndProblem(problem_id);
        return res;
    };



}

export default SubmissionController;