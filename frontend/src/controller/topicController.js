import TopicApi from "../api/topicApi";
import Controller from "./base";

class TopicController extends Controller {
  topicApi = new TopicApi();
  getAllTopics = async () => {
    const res = await this.topicApi.getAllTopics();
    return res;
  };
  getTopicById = async (id) => {
    const res = await this.topicApi.getTopicById(id);
    return res;
  };
  updateTopic = async (id, data) => {
    const res = await this.topicApi.updateTopic(id, data);
    return res;
  };
  createTopic = async (name) => {
    const res = await this.topicApi.createTopic(name);
    return res;
  };
}
export default TopicController;
