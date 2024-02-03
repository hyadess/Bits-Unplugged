const Repository = require("./base");
const SeriesRepository = require("./seriesRepository");
const seriesRepository = new SeriesRepository();
const CanvasRepository = require("./canvasRepository");
const canvasRepository = new CanvasRepository();
const db = require("../models/index");
const { Op } = require("sequelize");

class ProblemsRepository extends Repository {
  constructor() {
    super();
  }

  getAllProblems = async () => {
    const problems = await db.Problem.findAll();
    return problems;
  };

  getSubmittedProblems = async () => {
    const latestProblems = await db.ProblemVersion.findAll({
      where: {
        createdAt: db.Sequelize
          .literal(`("ProblemVersion"."problemId", "ProblemVersion"."createdAt") IN (
          SELECT "problemId", MAX("createdAt") as "latestCreatedAt"
          FROM "ProblemVersions" PV
          GROUP BY "problemId"
        )`),
      },
      include: [
        {
          model: db.Canvas,
          attributes: ["id", "name", "classname", "info"],
          as: "canvas",
          required: true,
        },
      ],
    });
    console.log(latestProblems);
    return latestProblems;
    // const query = `
    // SELECT * FROM "ProblemVersions";
    // `;
    // const params = [];
    // const result = await this.query(query, params);
    // return result;
  };

  getMyProblems = async (setterId) => {
    const problems = await db.Problem.findAll({
      include: [
        {
          model: db.Canvas,
          as: "canvas",
        },
      ],
      where: {
        setterId: setterId,
      },
    });
    return problems;
  };

  getAllUnsolvedProblems = async (userId) => {
    const query = `
    SELECT LP.*, 
    S.name AS "seriesName", 
    T.name AS "topicName" 
    FROM "ProblemVersions" LP
    JOIN "Series" S ON LP."seriesId" = S.id
    JOIN "Topics" T ON S."topicId" = T.id
    LEFT JOIN "Activities" U ON LP."problemId" = U."problemId" AND U."userId" = $1
    WHERE (U."userId" IS NULL OR U."isSolved" = FALSE)
    AND LP."isLive" = TRUE;
    `;
    const params = [userId];
    const result = await this.query(query, params);
    return result;
  };

  getAllUnsolvedAndAttemptedProblems = async (userId) => {
    const query = `
    SELECT P.*, 
    S.name AS "seriesName", 
    T.name AS "topicName" 
    FROM "Problems" P
    JOIN "Series" S ON P."seriesId" = S.id
    JOIN "Topics" T ON S."topicId" = T.id
    LEFT JOIN "Activities" U ON P."id" = U."problemId" AND U."userId" = $1
    WHERE (U."userId" IS NOT NULL AND U."isSolved" = FALSE)
    AND P."isLive" = TRUE
    ORDER BY U."conseqFailedAttempt" DESC;
    `;
    const params = [userId];
    const result = await this.query(query, params);
    return result;
  };

  getRecommendations = async (userId) => {
    return await this.getAllUnsolvedAndAttemptedProblems(userId);
  };

  // getProblemsByTopic = async (topicId) => {
  //   const query = `
  //   SELECT *
  //   FROM "Problems" P
  //   JOIN "Series" A
  //   ON P."seriesId" = A."seriesId"
  //   WHERE A."topicId" = $1;
  //   `;
  //   const params = [topicId];
  //   const result = await this.query(query, params);
  //   return result;
  // };

  getProblemById = async (problemId) => {
    return await db.Problem.findByPk(problemId, {
      include: [
        {
          model: db.Canvas,
          as: "canvas",
        },
      ],
    });
  };

  getPublishedProblemById = async (problemId) => {
    const problem = await db.ProblemVersion.findByPk(problemId, {
      include: [
        {
          model: db.Series,
          as: "series",
          include: [
            {
              model: db.Topic,
              as: "topic",
            },
          ],
        },
        {
          model: db.Canvas,
          attributes: ["id", "name", "classname", "info"],
          as: "canvas",
        },
      ],
      where: {
        isLive: true, // Specify the condition to filter by isLive
      },
    });
    // console.log(problem.Series);
    return problem;
  };

  getSubmittedProblemById = async (problemId) => {
    return await db.ProblemVersion.findByPk(problemId, {
      include: [
        {
          model: db.Series,
          as: "series",
          include: [
            {
              model: db.Topic,
              as: "topic",
            },
          ],
        },
        {
          model: db.Canvas,
          attributes: ["id", "name", "classname", "info"],
          as: "canvas",
        },
      ],
    });
  };

  submitProblem = async (problemId) => {
    const problem = await this.getProblemById(problemId);
    // Need fixing
    if (problem) {
      return await db.ProblemVersion.create({
        problemId: problem.id,
        canvasId: problem.canvasId,
        title: problem.title,
        statement: problem.statement,
        canvasData: problem.canvasData,
        editOptions: problem.editOptions,
        previewOptions: problem.previewOptions,
        checkerCode: problem.checkerCode,
        checkerCanvas: problem.checkerCanvas,
      });
    }
    return null;
  };

  publishProblem = async (problemId) => {
    const query = `
    UPDATE "ProblemVersions"
    SET "isLive" = TRUE
    WHERE "id" = $1;
    `;
    const params = [problemId];
    const result = await this.query(query, params);
    return result;
  };

  unpublishProblem = async (problemId) => {
    const query = `
    UPDATE "ProblemVersions"
    SET "isLive" = FALSE
    WHERE "id" = $1;
    `;
    const params = [problemId];
    const result = await this.query(query, params);
    return result;
  };

  updateSeries = async (problemId, seriesId) => {
    const query = `
    UPDATE "ProblemVersions"
    SET "seriesId" = $2
    WHERE "id" = $1;
    `;
    const params = [problemId, seriesId];
    const result = await this.query(query, params);
    return result;
  };

  createProblem = async (setterId, data) => {
    return await db.Problem.create({ ...data, setterId });
  };

  updateProblem = async (id, data) => {
    const [updatedRowsCount, [updatedProblem]] = await db.Problem.update(data, {
      returning: true,
      where: {
        id,
      },
    });
    if (updatedRowsCount === 0) {
      return null;
    }
    return updatedProblem.get();
  };

  updateProblemVersion = async (id, data) => {
    console.log(data);
    const [updatedRowsCount, [updatedProblem]] = await db.ProblemVersion.update(
      data,
      {
        returning: true,
        where: {
          id,
        },
      }
    );
    if (updatedRowsCount === 0) {
      return null;
    }
    return updatedProblem.get();
  };

  getLatestProblemsBySeries = async (seriesId) => {
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
      },
      include: [
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

    return latestProblemVersionsQuery;
  };

  updateProblemsBySeries = async (seriesId, data) => {
    const existingProblems = await this.getLatestProblemsBySeries(seriesId);
    const existingProblemIds = existingProblems.map((problem) => problem.id);
    const dataProblemIds = data.map((problem) => problem.id);
    const problemsToDelete = existingProblemIds.filter(
      (id) => !dataProblemIds.includes(id)
    );
    const problemsToUpdate = existingProblemIds.filter((id) =>
      dataProblemIds.includes(id)
    );
    const problemsToCreate = dataProblemIds.filter(
      (id) => !existingProblemIds.includes(id)
    );

    const transaction = await db.sequelize.transaction();
    try {
      const deletedProblems = await db.ProblemVersion.destroy({
        returning: true,
        where: {
          id: problemsToDelete,
        },
        transaction,
      });
      for (const problem of data) {
        const recordToUpdate = await db.ProblemVersion.update(problem, {
          returning: true,
          where: {
            id: problem.id,
          },
        });
      }
      const createdProblems = await db.ProblemVersion.bulkCreate(
        problemsToCreate,
        {
          transaction,
        }
      );
      await transaction.commit();
      return createdProblems;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  };

  deleteProblem = async (id) => {
    const deleteProblem = await db.Problem.destroy({
      where: {
        id,
      },
      returning: true,
    });

    if (!deleteProblem) {
      return null;
    }
    return deleteProblem;
  };

  // clone a problem by id on db.Problem
  cloneProblem = async (id) => {
    const problem = await db.Problem.findByPk(id);
    if (!problem) {
      return null;
    }
    // use suffix Copy to avoid duplicate name
    const clonedProblem = await db.Problem.create({
      ...problem.toJSON(),
      id: undefined,
      // but what if there are multiple copies of the same problem?
      title: problem.title + " Copy",
    });
    // console.log(clonedProblem);
    return clonedProblem;
  };

  approveProblem = async (id) => {
    // Just update the approvalStatus field in ProblemVersion to 1 using ORM
    const updatedProblem = await db.ProblemVersion.update(
      {
        approvalStatus: 1,
      },
      {
        where: {
          id,
        },
      }
    );
    return updatedProblem;
  };

  rejectProblem = async (id, feedback) => {
    // Just update the approvalStatus field in ProblemVersion to 0 using ORM
    const updatedProblem = await db.ProblemVersion.update(
      {
        approvalStatus: 0,
        feedback: feedback,
      },
      {
        where: {
          id,
        },
      }
    );
    return updatedProblem;
  };

  getAllVersions = async (id) => {
    const versions = await db.ProblemVersion.findAll({
      where: {
        problemId: id,
      },
      include: [
        {
          model: db.Canvas,
          attributes: ["id", "name", "classname", "info"],
          as: "canvas",
          required: true,
        },
      ],
      order: [["id", "DESC"]],
    });
    return versions;
  };
}

module.exports = ProblemsRepository;
