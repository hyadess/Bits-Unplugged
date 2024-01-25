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
  createTopic = async (name) => {
    return await this.post("/topics/", {
      name: name,
    });
  };
}
export default TopicApi;
