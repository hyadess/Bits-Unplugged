import Api from "./base";

class TopicApi extends Api {
  getAllTopics = async () => {
    return await this.get("/topics");
  };
  getTopicById = async (id) => {
    return await this.get("/topics/" + id);
  };
  updateTopic = async (id, data) => {
    return await this.put("/topics/" + id, data);
  };
  updateTopics = async (data) => {
    return await this.put("/topics/", data);
  };
  createTopic = async (name) => {
    return await this.post("/topics/", {
      name: name,
    });
  };
  deleteTopic = async (id) => {
    return await this.delete("/topics/" + id);
  };
  updateTopicSerial = async (data) => {
    return await this.put("/topics/serial", data);
  };
  getAllSeries = async (topicId) => {
    return await this.get("/topics/" + topicId + "/series");
  };
  updateSeries = async (id, data) => {
    return await this.put("/topics/" + id + "/series", data);
  };
}
export default TopicApi;
