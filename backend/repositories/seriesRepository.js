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
      // descending order by serialNo
      order: [["serialNo", "DESC"]],
    });
    return series;
  };

  updateSeriesByTopic = async (topicId, data) => {
    console.log("Called");
    const transaction = await db.sequelize.transaction();
    try {
      // find all series by topicId
      const existingSeries = await db.Series.findAll({
        where: {
          topicId,
        },
        transaction,
      });

      const existingSeriesIds = existingSeries.map((series) => series.id);
      const dataSeriesIds = data.map((series) => series.id);
      const seriesToDelete = existingSeriesIds.filter(
        (id) => !dataSeriesIds.includes(id)
      );
      const seriesToUpdate = existingSeriesIds.filter((id) =>
        dataSeriesIds.includes(id)
      );
      const seriesToCreate = dataSeriesIds.filter(
        (id) => !existingSeriesIds.includes(id)
      );
      const deletedSeries = await db.Series.update(
        { topicId: null },
        {
          returning: true,
          where: {
            id: seriesToDelete,
          },
          transaction,
        }
      );

      console.log(seriesToUpdate);
      for (const series of data) {
        const recordToUpdate = await db.Series.update(series, {
          returning: true,
          where: {
            id: series.id,
          },
        });
      }
      const createdSeries = await db.Series.bulkCreate(seriesToCreate, {
        transaction,
      });
      await transaction.commit();
      return createdSeries;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
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

    // console.log(latestProblemVersions);
    const latestProblemVersionsQuery = await db.ProblemVersion.findAll({
      where: {
        problemId: {
          [Op.in]: latestProblemIds,
        },
        createdAt: latestProblemVersions.map(
          (version) => version.latestCreatedAt
        ),
        ...(filter.isSolved !== null && {
          "$activities.isSolved$": filter.isSolved,
        }),
        ...(filter.isLive !== null && {
          isLive: filter.isLive,
        }),
        approvalStatus: 1,
      },
      include: [
        {
          model: db.Activity,
          foreignKey: "problemId",
          as: "activities",
          where: { userId }, // Add your specific userId filter here
          required: false,
        },
        {
          model: db.Series,
          foreignKey: "seriesId",
          as: "series",
          required: true,
          include: [
            {
              model: db.Topic,
              foreignKey: "topicId",
              as: "topic",
              required: true,
            },
          ],
        },
      ],
      order: [
        ["serialNo", "DESC"], // Change 'ASC' to 'DESC' if you want descending order
      ],
    });

    console.log(latestProblemVersionsQuery[1]);
    return latestProblemVersionsQuery;
  };

  updateSerial = async (data) => {
    for (const item of data) {
      const { problemId, serialNo } = item;
      const recordToUpdate = await db.ProblemVersion.update(
        {
          serialNo,
        },
        {
          returning: true,
          where: { id: problemId },
        }
      );
    }
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
