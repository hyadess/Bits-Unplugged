import CanvasApi from "./canvasApi";
import ProblemApi from "./problemApi";
import ProfileApi from "./profileApi";
import SeriesApi from "./seriesApi";
import SubmissionApi from "./submissionApi";
import TopicApi from "./topicApi";
import UserActivityApi from "./userActivityApi";

export const canvasApi = new CanvasApi();
export const topicApi = new TopicApi();
export const seriesApi = new SeriesApi();
export const problemApi = new ProblemApi();
export const profileApi = new ProfileApi();
export const submissionApi = new SubmissionApi();
export const userActivityApi = new UserActivityApi();
