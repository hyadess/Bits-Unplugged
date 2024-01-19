import SubmissionApi from "../api/submissionApi";
import Controller from "./base";
import { showToast } from "../App";

class SubmissionController extends Controller {
  submissionApi = new SubmissionApi();
}

export default SubmissionController;