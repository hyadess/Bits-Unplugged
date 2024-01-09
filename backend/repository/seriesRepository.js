const Repository = require("./base");

class SeriesRepository extends Repository {
  constructor() {
    super();
  }

  getAllSeries = async () => {
    const query = `
      SELECT * FROM "Series";
    `;
    const params = [];
    const result = await this.query(query, params);
    return result;
  };

  getSeriesByTopic = async (topicId) => {
    const query = `
      SELECT * FROM "Series"
      WHERE "topicId" = $1;
    `;
    const params = [topicId];
    const result = await this.query(query, params);
    return result;
  };

  getSeriesById = async (seriesId) => {
    const query = `
      SELECT * FROM "Series"
      WHERE "id" = $1;
    `;
    const params = [seriesId];
    const result = await this.query(query, params);
    return result;
  };

  addSeries = async (data) => {
    const query = `
      INSERT INTO "Series" ("name")
      VALUES ($1)
      RETURNING "id";
    `;
    const params = [data.name];
    const result = await this.query(query, params);
    return result;
  };

  updateSeries = async (seriesId, data) => {
    const query = `
      UPDATE "Series"
      SET "topicId" = $2, "name" = $3, "description" = $4, "logo" = $5
      WHERE "id" = $1;
    `;
    const params = [
      seriesId,
      data.topicId,
      data.name,
      data.description,
      data.logo,
    ];
    const result = await this.query(query, params);
    return result;
  };

  deleteSeries = async (seriesId) => {
    const query = `
      DELETE FROM "Series"
      WHERE "id" = $1;
    `;
    const params = [seriesId];
    const result = await this.query(query, params);
    return result;
  };

  getAllProblems = async (seriesId) => {
    const query = `
      SELECT * FROM "Problems"
      WHERE "id" = $1;
    `;
    const params = [seriesId];
    const result = await this.query(query, params);
    return result;
  };

  // Uncomment and implement these methods if needed
  // deleteProblemSerial = async (problemId) => {
  //   const query = `
  //     DELETE FROM "Serial"
  //     WHERE "problemId" = $1;
  //   `;
  //   const params = [problemId];
  //   const result = await this.query(query, params);
  //   return result;
  // };

  // setProblemSerial = async (problemId, seriesId, serialNo) => {
  //   const result = await this.deleteProblemSerial(problemId);
  //   if (result.success) {
  //     const query2 = `
  //       INSERT INTO "Serial" ("problemId", "seriesId", "serialNo")
  //       VALUES ($1, $2, $3);
  //     `;
  //     const params2 = [problemId, seriesId, serialNo];
  //     const result2 = await this.query(query2, params2);
  //     return result2;
  //   }
  // };
}

module.exports = SeriesRepository;
