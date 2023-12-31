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
    const key = "rediskey_" + "all_topics";
    const result = await this.query_redis(key, query, params);
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
      INSERT INTO topic (name)
      VALUES ($1)
      RETURNING topic_id;
    `;
    const params = [data.name];
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
