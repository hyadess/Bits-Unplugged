const Controller = require("./base");
const TopicRepository = require("../repository/topicRepository");
const topicRepository = new TopicRepository();
class TopicController extends Controller {
  constructor() {
    super();
  }
  getAllTopics = async (req, res) => {
    this.handleRequest(res, async () => {
      const topics = await topicRepository.getAllTopics();
      res.status(200).send(topics);
    });
  };
  getTopicById = async (req, res) => {
    this.handleRequest(res, async () => {
      const topic = await topicRepository.getTopicById(req.params.topic_id);
      if (!topic) {
        res.status(404).json({ error: "Topic not found" });
      } else {
        res.status(200).json(topic);
      }
    });
  };
  addTopic = async (req, res) => {
    this.handleRequest(res, async () => {
      const newTopic = await topicRepository.addTopic(req.body);
      res
        .status(201)
        .json({ topic_id: newTopic.id, message: "Topic added successfully" });
    });
  };

  updateTopic = async (req, res) => {
    this.handleRequest(res, async () => {
      const updatedTopic = await topicRepository.updateTopic(
        req.params.topic_id,
        req.body.topic
      );
      if (!updatedTopic) {
        res.status(404).json({ error: "Topic not found" });
      } else {
        res.status(200).json({ message: "Topic updated successfully" });
      }
    });
  };

  deleteTopic = async (req, res) => {
    this.handleRequest(res, async () => {
      const deletedTopic = await topicRepository.deleteTopic(
        req.params.topic_id
      );
      if (!deletedTopic) {
        res.status(404).json({ error: "Topic not found" });
      } else {
        res.status(200).json({ message: "Topic deleted successfully" });
      }
    });
  };
}

module.exports = TopicController;
