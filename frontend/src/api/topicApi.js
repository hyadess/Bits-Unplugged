import Api from "./base";

class TopicApi extends Api {
  getAllTopics = async () => {
    return await this.get("/topic");
  };
}
export default TopicApi;
