const Repository = require("./base");
const db = require("../models/index");
const { Op } = require("sequelize");
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

  // isSolve = false -> requirement = true
  getAllProblems = async (userId, seriesId, filter) => {
    const latestProblemVersions = await db.ProblemVersion.findAll({
      attributes: [
        "problemId",
        [
          db.sequelize.fn("MAX", db.sequelize.col("createdAt")),
          "latestCreatedAt",
        ],
      ],
      where: {
        seriesId: seriesId,
      },
      group: ["problemId", "seriesId"],
      raw: true, // To get plain objects instead of Sequelize instances
    });

    const latestProblemIds = latestProblemVersions.map(
      (version) => version.problemId
    );
    const latestProblemVersionsQuery = await db.ProblemVersion.findAll({
      where: {
        problemId: {
          [Op.in]: latestProblemIds,
        },
        createdAt: latestProblemVersions.map(
          (version) => version.latestCreatedAt
        ),
        "$activities.userId$": { [Op.or]: [userId, null] },
        ...(filter.isSolved !== null && {
          "$activities.isSolved$": filter.isSolved,
        }),
        ...(filter.isLive !== null && {
          isLive: filter.isLive,
        }),
      },
      include: [
        {
          model: db.Activity,
          foreignKey: "problemId",
          as: "activities",
        },
      ],
    });

    // console.log(latestProblemVersionsQuery);
    return latestProblemVersionsQuery;
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