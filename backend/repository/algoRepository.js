const Repository = require("./base");

class AlgoRepository extends Repository {
  constructor() {
    super();
  }

  getAllAlgos = async () => {
    const query = `
    SELECT * FROM Algorithm;
    `;
    const params = [];
    const result = await this.query(query, params);
    return result;
  };

  getAlgosByTopic = async (topic_id) => {
    const query = `
    SELECT * FROM Algorithm
    WHERE topic_id = $1;
    `;
    const params = [topic_id];
    const result = await this.query(query, params);
    return result;
  };
  getAlgoById = async (algo_id) => {
    const query = `
      SELECT * FROM Algorithm
      WHERE algo_id = $1;
    `;
    const params = [algo_id];
    const result = await this.query(query, params);
    return result;
  };
  addAlgorithm = async (data) => {
    const query = `
      INSERT INTO Algorithm (topic_id, canvas_id, name, description, logo)
      VALUES ($1, $2, $3, $4, $5);
    `;
    const params = [
      data.topic_id,
      data.canvas_id,
      data.name,
      data.description,
      data.logo,
    ];
    const result = await this.query(query, params);
    return result;
  };
  updateAlgorithm = async (algo_id, data) => {
    // First Update to Canvas Table
    const query = `
      UPDATE Algorithm
      SET topic_id = $2,canvas_id = $3, name = $4, description = $5, logo = $6
      WHERE algo_id = $1;
    `;
    const params = [
      algo_id,
      data.topic_id,
      data.canvas_id,
      data.name,
      data.description,
      data.logo,
    ];
    const result = await this.query(query, params);
    return result;
  };
  deleteAlgorithm = async (algo_id) => {
    const query = `
      DELETE FROM Algorithm
      WHERE algo_id = $1;
    `;
    const params = [algo_id];
    const result = await this.query(query, params);
    return result;
  };
}

module.exports = AlgoRepository;
