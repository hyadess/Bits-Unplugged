import AlgoApi from "../api/algoApi";
import Controller from "./base";

class AlgoController extends Controller {
  algoApi = new AlgoApi();
  getAllAlgos = async () => {
    const res = await this.algoApi.getAllAlgos();
    return res;
  };
  getAlgosByTopic = async (topic_id) => {
    const res = await this.algoApi.getAlgosByTopic(topic_id);
    return res;
  };
  getAlgoById = async (algo_id) => {
    const res = await this.algoApi.getAlgoById(algo_id);
    return res;
  };
}
export default AlgoController;
