const Repository = require("./base");

class TopicRepository extends Repository {
  constructor() {
    super();
  }
  getAllTopics = async () => {
    const query = `
    SELECT * FROM Topic;
    `;
    const params = [];
    const result = await this.query(query, params);
    return result;
  };
  getTopicById = async (topic_id) => {
    const query = `
      SELECT * FROM Topic
      WHERE topic_id = $1;
    `;
    const params = [topic_id];
    const result = await this.query(query, params);
    return result;
  };
  addTopic = async (data) => {
    const query = `
      INSERT INTO topic (name, description, logo)
      VALUES ($1, $2, $3);
    `;
    const params = [data.name, data.description, data.logo];
    const result = await this.query(query, params);
    return result;
  };
  updateTopic = async (topic_id, data) => {
    const query = `
      UPDATE topic
      SET name = $2, description = $3, logo = $4
      WHERE topic_id = $1;
    `;
    const params = [topic_id, data.name, data.description, data.logo];
    const result = await this.query(query, params);
    return result;
  };
  deleteTopic = async (topic_id) => {
    const query = `
      DELETE FROM Topic
      WHERE topic_id = $1;
    `;
    const params = [topic_id];
    const result = await this.query(query, params);
    return result;
  };
}

module.exports = TopicRepository;
