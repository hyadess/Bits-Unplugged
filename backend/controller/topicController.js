const Controller = require("./base");
const TopicRepository = require("../repository/topicRepository");
const topicRepository = new TopicRepository();
class TopicController extends Controller {
  constructor() {
    super();
  }
  getAllTopics = async (req, res) => {
    try {
      let topics = await topicRepository.getAllTopics();
      return res.status(200).send(topics);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  };
  getTopicById = async (req, res) => {
    try {
      let topic = await topicRepository.getTopicById(req.params.topic_id);
      if (!topic) {
        return res.status(404).json({ error: "Topic not found" });
      }
      return res.status(200).json(topic);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  };
  addTopic = async (req, res) => {
    try {
      let newTopic = await topicRepository.addTopic(req.body);
      return res
        .status(201)
        .json({ topic_id: newTopic.id, message: "Topic added successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  };
  updateTopic = async (req, res) => {
    try {
      const updatedTopic = await topicRepository.updateTopic(
        req.params.topic_id,
        req.body.topic
      );
      if (!updatedTopic) {
        return res.status(404).json({ error: "Topic not found" });
      }
      return res.status(200).json({ message: "Topic updated successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  };
  deleteTopic = async (req, res) => {
    try {
      const deletedTopic = await topicRepository.deleteTopic(
        req.params.topic_id
      );
      if (!deletedTopic) {
        return res.status(404).json({ error: "Topic not found" });
      }
      return res.status(200).json({ message: "Topic deleted successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  };
}

module.exports = TopicController;
