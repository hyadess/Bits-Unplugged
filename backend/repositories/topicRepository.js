const Repository = require("./base");
const db = require("../models/index");

class TopicRepository extends Repository {
  constructor() {
    super();
  }
  getAllTopics = async () => {
    // In descending order of serialNo
    const topics = await db.Topic.findAll({
      order: [["serialNo", "DESC"]],
    });
    return topics;
  };
  getTopicById = async (id) => {
    const topic = await db.Topic.findByPk(id);
    return topic;
  };
  createTopic = async (data) => {
    const newTopic = await db.Topic.create(data); // {name, description, logo}
    return newTopic;
  };
  updateTopic = async (id, data) => {
    console.log(id, data);
    const [updatedRowsCount, [updatedTopic]] = await db.Topic.update(data, {
      returning: true,
      where: {
        id,
      },
    });
    if (updatedRowsCount === 0) {
      return null;
    }
    return updatedTopic.get();
  };
  deleteTopic = async (id) => {
    const deletedTopic = await db.Topic.destroy({
      where: {
        id,
      },
      returning: true,
    });

    if (!deletedTopic) {
      return null;
    }
    return deletedTopic; // Return the deleted topic: Which is actually 1. Need a way around to find the row.
  };

  updateTopicSerial = async (data) => {
    // console.log(data);
    for (const item of data) {
      const { topicId, serialNo } = item;
      const recordToUpdate = await db.Topic.update(
        { serialNo },
        {
          returning: true,
          where: {
            id: topicId,
          },
        }
      );
    }
    // return updatedTopics;
  };
}

module.exports = TopicRepository;
