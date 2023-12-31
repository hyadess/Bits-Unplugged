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
      INSERT INTO Series (topic_id, name, description, logo)
      VALUES ($1, $2, $3, $4);
    `;
    const params = [data.topic_id, data.name, data.description, data.logo];
    const result = await this.query(query, params);
    return result;
  };
  updateSeries = async (series_id, data) => {
    // First Update to Canvas Table
    const query = `
      UPDATE Series
      SET topic_id = $2, name = $3, description = $4, logo = $5
      WHERE series_id = $1;
    `;
    const params = [
      series_id,
      data.topic_id,
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

  getAllProblems = async (series_id) => {
    const query = `
      SELECT * FROM Problem
      WHERE series_id = $1;
    `;
    const params = [series_id];
    const result = await this.query(query, params);
    return result;
  };

  // deleteProblemSerial = async (problem_id) => {
  //   const query = `
  //   DELETE FROM Serial
  //   WHERE problem_id = $1;
  // `;
  //   const params = [problem_id];
  //   const result = await this.query(query, params);
  //   return result;
  // };
  // setProblemSerial = async (problem_id, series_id, serial_no) => {
  //   const result = await deleteProblemSerial(problem_id);
  //   if (result.success) {
  //     const query2 = `
  //     INSERT INTO Serial (problem_id, series_id, serial_no)
  //     VALUES ($1, $2, $3);
  //   `;
  //     const params2 = [problem_id, series_id, serial_no];
  //     const result2 = await this.query(query2, params2);
  //     return result2;
  //   }
  // };
}

module.exports = SeriesRepository;
