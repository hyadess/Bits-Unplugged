const Repository = require("./base");
const db = require("../models/index");

class SeriesRepository extends Repository {
  constructor() {
    super();
  }

  getAllSeries = async () => {
    const series = await db.Series.findAll();
    return series;
  };

  getSeriesByTopic = async (topicId) => {
    const series = await db.Series.findAll({
      where: {
        topicId,
      },
    });
    return series;
  };

  getSeriesById = async (id) => {
    const series = await db.Series.findByPk(id);
    return series;
  };

  createSeries = async (data) => {
    const newSeries = await db.Series.create(data);
    return newSeries;
  };

  updateSeries = async (id, data) => {
    const [updatedRowsCount, [updatedSeries]] = await db.Series.update(data, {
      returning: true,
      where: {
        id,
      },
    });
    if (updatedRowsCount === 0) {
      return null;
    }
    return updatedSeries.get();
  };

  deleteSeries = async (id) => {
    const deletedSeries = await db.Series.destroy({
      where: {
        id,
      },
      returning: true,
    });

    if (deletedSeries === 0) {
      return null;
    }
    return deletedSeries;
  };

  getAllProblems = async (seriesId) => {
    const query = `
    SELECT * FROM "ProblemVersions"
    WHERE ("problemId", "createdAt") IN (
      SELECT "problemId", MAX("createdAt") as "latestCreatedAt"
      FROM "ProblemVersions"
      WHERE "seriesId" = $1
      GROUP BY "problemId", "seriesId"
    );
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
