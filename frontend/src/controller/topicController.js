import TopicApi from "../api/topicApi";
import Controller from "./base";

class TopicController extends Controller {
  topicApi = new TopicApi();
  getAllTopics = async () => {
    const res = await this.topicApi.getAllTopics();
    return res;
  };
}
export default TopicController;
