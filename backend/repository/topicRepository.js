const Repository = require("./base");
const db = require("../models/index");

class TopicRepository extends Repository {
  constructor() {
    super();
  }
  getAllTopics = async () => {
    const topics = await db.Topic.findAll();
    return topics;
  };
  getTopicById = async (topicId) => {
    const topic = await db.Topic.findOne({
      where: {
        id: topicId,
      },
    });
    return topic;
  };
  addTopic = async (data) => {
    const newTopic = await db.Topic.create({
      name: data.name,
    });
    return newTopic;
  };
  updateTopic = async (topicId, data) => {
    const [updatedRowsCount, [updatedTopic]] = await db.Topic.update(
      {
        name: data.name,
        description: data.description,
        logo: data.logo,
      },
      {
        returning: true,
        where: {
          id: topicId,
        },
      }
    );
    if (updatedRowsCount === 0) {
      return null;
    }
    return updatedTopic.get();
  };
  deleteTopic = async (topicId) => {
    const deletedTopic = await db.Topic.destroy({
      where: {
        id: topicId,
      },
      returning: true,
    });

    if (deletedTopic === 0) {
      return null;
    }
    return deletedTopic; // Return the deleted topic: Which is actually 1. Need a way around to find the row.
  };
}

module.exports = TopicRepository;
