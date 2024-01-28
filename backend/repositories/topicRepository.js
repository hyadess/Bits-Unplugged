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

  updateTopics = async (data) => {
    // delete all existing topic, and insert new ones from data. This operation should be atomic. Or you can suggest a better way. I suggest want, If the topic doesn't exist, create it. If it exists, update it. If it exists in the database but not in the data, delete it.
    // const transaction = await db.sequelize.transaction();
    // try {
    //   const deletedTopics = await db.Topic.destroy({
    //     where: {},
    //     truncate: true,
    //     transaction,
    //   });
    //   const newTopics = await db.Topic.bulkCreate(data, { transaction });
    //   await transaction.commit();
    //   return newTopics;
    // } catch (error) {
    //   await transaction.rollback();
    //   throw error;
    // }
    // for (const topic of data) {
    //   const recordToUpdate = await db.Topic.update(topic, {
    //     returning: true,
    //     where: {
    //       id: topic.id,
    //     },
    //   });
    // }
    // return updatedTopics;
    //  If the topic doesn't exist, create it. If it exists, update it. If it exists in the database but not in the data, delete it.
    const transaction = await db.sequelize.transaction();
    try {
      const existingTopics = await db.Topic.findAll();
      const existingTopicIds = existingTopics.map((topic) => topic.id);
      const dataTopicIds = data.map((topic) => topic.id);
      const topicsToDelete = existingTopicIds.filter(
        (id) => !dataTopicIds.includes(id)
      );
      const topicsToUpdate = existingTopicIds.filter((id) =>
        dataTopicIds.includes(id)
      );
      const topicsToCreate = dataTopicIds.filter(
        (id) => !existingTopicIds.includes(id)
      );
      const deletedTopics = await db.Topic.destroy({
        where: {
          id: topicsToDelete,
        },
        transaction,
      });

      // console.log(topicsToUpdate);
      for (const topic of data) {
        const recordToUpdate = await db.Topic.update(topic, {
          returning: true,
          where: {
            id: topic.id,
          },
        });
      }
      // const updatedTopics = await Promise.all(
      //   topicsToUpdate.map(async (id) => {
      //     const recordToUpdate = await db.Topic.update(data, {
      //       returning: true,
      //       where: {
      //         id,
      //       },
      //       transaction,
      //     });
      //     return recordToUpdate;
      //   })
      // );
      const createdTopics = await db.Topic.bulkCreate(topicsToCreate, {
        transaction,
      });
      await transaction.commit();
      return createdTopics;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
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
