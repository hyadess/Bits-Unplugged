import TopicApi from "../api/topicApi";
import Controller from "./base";

class TopicController extends Controller {
  topicApi = new TopicApi();
}
export default TopicController;
