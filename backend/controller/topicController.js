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
    if (result.success) {
      if (result.data.length > 0) {
        // success
        res.status(200).json(result.data[0]);
      } else {
        // known error
        res.status(404).json({ error: "No topic with this topic_id" });
      }
    } else {
      // unexpected error
      res.status(500).json(result);
    }
  };
  addTopic = async (req, res) => {
    let result = await topicRepository.addTopic(req.body);
    if (result.success) {
      // success
      res.status(201).json(result.data);
    } else {
      // unexpected error
      res.status(500).json(result);
    }
  };
  updateTopic = async (req, res) => {
    let result = await topicRepository.updateTopic(
      req.params.topic_id,
      req.body.topic
    );
    if (result.success) {
      if (result.data.length > 0) {
        // success
        res.status(204).json();
      } else {
        // known error
        res.status(404).json({ error: "No topic with this topic_id" });
      }
    } else {
      // unexpected error
      res.status(500).json(result);
    }
  };
  deleteTopic = async (req, res) => {
    let result = await topicRepository.deleteTopic(req.params.topic_id);
    if (result.success) {
      if (result.data.length > 0) {
        // success
        res.status(204).json();
      } else {
        // known error
        res.status(404).json({ error: "No topic with this topic_id" });
      }
    } else {
      // unexpected error
      res.status(500).json(result);
    }
  };
}

module.exports = TopicController;
