const Controller = require("./base");
const TopicRepository = require("../repository/topicRepository");
const topicRepository = new TopicRepository();
class TopicController extends Controller {
  constructor() {
    super();
  }
  getAllTopics = async (req, res) => {
    let result = await topicRepository.getAllTopics();
    this.handleResponse(result, res);
  };
  getTopicById = async (req, res) => {
    let result = await topicRepository.getTopicById(req.params.topic_id);
    this.handleResponse(result, res);
  };
  addTopic = async (req, res) => {
    let result = await topicRepository.addTopic(req.body);
    if (result.success) {
      res.status(201).json(result.data);
    } else {
      res.status(500).json(result);
    }
    // this.handleResponse(result, res);
  };
  updateTopic = async (req, res) => {
    let result = await topicRepository.updateTopic(
      req.params.topic_id,
      req.body.topic
    );
    if (result.success) {
      res.status(204).json();
    } else {
      res.status(500).json(result);
    }
    // this.handleResponse(result, res);
  };
  deleteTopic = async (req, res) => {
    let result = await topicRepository.deleteTopic(req.params.topic_id);
    if (result.success) {
      res.status(204).json();
    } else {
      res.status(500).json(result);
    }
    // this.handleResponse(result, res);
  };
}

module.exports = TopicController;
