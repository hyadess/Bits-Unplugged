const Repository = require("./base");

class SeriesRepository extends Repository {
  constructor() {
    super();
  }

  getAllSeries = async () => {
    const query = `
    SELECT * FROM Series;
    `;
    const params = [];
    const result = await this.query(query, params);
    return result;
  };

  getSeriesByTopic = async (topic_id) => {
    const query = `
    SELECT * FROM Series
    WHERE topic_id = $1;
    `;
    const params = [topic_id];
    const result = await this.query(query, params);
    return result;
  };
  getSeriesById = async (series_id) => {
    const query = `
      SELECT * FROM Series
      WHERE series_id = $1;
    `;
    const params = [series_id];
    const result = await this.query(query, params);
    return result;
  };
  addSeries = async (data) => {
    const query = `
      INSERT INTO Series (topic_id, canvas_id, name, description, logo)
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
  updateSeries = async (series_id, data) => {
    // First Update to Canvas Table
    const query = `
      UPDATE Series
      SET topic_id = $2,canvas_id = $3, name = $4, description = $5, logo = $6
      WHERE series_id = $1;
    `;
    const params = [
      series_id,
      data.topic_id,
      data.canvas_id,
      data.name,
      data.description,
      data.logo,
    ];
    const result = await this.query(query, params);
    return result;
  };
  deleteSeries = async (series_id) => {
    const query = `
      DELETE FROM Series
      WHERE series_id = $1;
    `;
    const params = [series_id];
    const result = await this.query(query, params);
    return result;
  };
}

module.exports = SeriesRepository;
