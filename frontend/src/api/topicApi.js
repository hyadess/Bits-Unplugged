import Api from "./base";

class TopicApi extends Api {
  getAllTopics = async () => {
    return await this.get("/topic");
  };
  getTopicById = async (id) => {
    return await this.get("/topic/" + id);
  };
  updateTopic = async (id, data) => {
    return await this.put("/topic/" + id, {
      topic: data,
    });
  };
  addTopic = async (name) => {
    return await this.post("/topic/", {
      name: name,
    });
  };
}
export default TopicApi;
