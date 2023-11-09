import Api from "./base";

class AlgoApi extends Api {
  getAllAlgos = async () => {
    return await this.get("/algorithm");
  };
  getAlgosByTopic = async (topic_id) => {
    return await this.get("/algorithm/by_topic/" + topic_id);
  };
  getAlgosById = async (algo_id) => {
    return await this.get("/algorithm/" + algo_id);
  };
}
export default AlgoApi;
