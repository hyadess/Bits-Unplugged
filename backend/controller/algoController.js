const Controller = require("./base");
const AlgoRepository = require("../repository/algoRepository");
const algoRepository = new AlgoRepository();
class AlgoController extends Controller {
  constructor() {
    super();
  }

  getAllAlgos = async (req, res) => {
    let result = await algoRepository.getAllAlgos();
    this.handleResponse(result, res);
  };

  getAlgosByTopic = async (req, res) => {
    let result = await algoRepository.getAlgosByTopic(req.params.topic_id);
    this.handleResponse(result, res);
  };
  getAlgoById = async (req, res) => {
    let result = await algoRepository.getAlgoById(req.params.algo_id);
    this.handleResponse(result, res);
  };
  addAlgorithm = async (req, res) => {
    let result = await algoRepository.addAlgorithm(req.body);
    this.handleResponse(result, res);
  };
  updateAlgorithm = async (req, res) => {
    let result = await algoRepository.updateAlgorithm(
      req.params.algo_id,
      req.body
    );
    this.handleResponse(result, res);
  };
  deleteAlgorithm = async (req, res) => {
    let result = await algoRepository.deleteAlgorithm(req.params.algo_id);
    this.handleResponse(result, res);
  };
}

module.exports = AlgoController;
