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

  getAllLiveProblems = async (userId) => {
    const latestProblems = await db.ProblemVersion.findAll({
      where: {
        isLive: true,
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
        ["updatedAt", "DESC"], // Change 'ASC' to 'DESC' if you want descending order
      ],
    });
    return latestProblems;
  };

  getLiveProblemsBySeries = async (userId, seriesId) => {
    const latestProblems = await db.ProblemVersion.findAll({
      where: {
        approvalStatus: 1,
        isLive: true,
        seriesId,
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
    return latestProblems;
  };

  getSubmittedProblems = async () => {
    console.log("Get all admin problem");
    const latestProblems = await db.ProblemVersion.findAll({
      where: {
        approvalStatus: {
          [Op.or]: [1, 2],
        },
      },
      include: [
        {
          model: db.Canvas,
          attributes: ["id", "name", "classname", "info"],
          as: "canvas",
          required: true,
        },
        {
          model: db.Problem,
          as: "problem",
          required: true,
          attributes: ["setterId"],
          include: [
            {
              model: db.Setter,
              as: "setter",
              required: true,
              attributes: ["isApproved"],
              // Include all attributes of Setter or specify the ones you need
              include: [
                {
                  model: db.User,
                  as: "user",
                  required: true,
                  // Include all attributes of User or specify the ones you need
                },
              ],
            },
          ],
        },
      ],
      order: [
        ["updatedAt", "DESC"], // Change 'ASC' to 'DESC' if you want descending order
      ],
    });
    return latestProblems;
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
    (SELECT "P".*, 
    "S"."name" AS "seriesName", 
    "T"."name" AS "topicName",
    "A"."isSolved"
    FROM "ProblemVersions" "P"
    JOIN "Series" "S" ON "P"."seriesId" = "S"."id"
    JOIN "Topics" "T" ON "S"."topicId" = "T"."id"
    JOIN "Activities" "A" ON "P"."id" = "A"."problemId" AND "A"."userId" = $1
    WHERE "A"."isSolved" = FALSE
    AND "P"."isLive" = TRUE
    ORDER BY "A"."conseqFailedAttempt" DESC)
    UNION ALL
    (SELECT "P".*, 
    "S"."name" AS "seriesName", 
    "T"."name" AS "topicName",
    null AS "isSolved"
    FROM "ProblemVersions" "P"
    JOIN "Series" "S" ON "P"."seriesId" = "S"."id"
    JOIN "Topics" "T" ON "S"."topicId" = "T"."id"
    WHERE "P"."isLive" = TRUE AND  "P"."approvalStatus" = 1
    AND NOT EXISTS (
      SELECT 1 FROM "Activities" "A" 
      WHERE "P"."id" = "A"."problemId" AND "A"."userId" = $1)    
    LIMIT 2);
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
    console.log(data);
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
    console.log(id, data);
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
    // console.log(latestProblemVersions);
    const latestProblemVersionsQuery = await db.ProblemVersion.findAll({
      where: {
        approvalStatus: 1,
        seriesId,
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
    // First find the problemId of this problemVersion from id
    const problemVersion = await db.ProblemVersion.findByPk(id);
    if (!problemVersion) {
      return null;
    }
    const problemId = problemVersion.problemId;

    // Then update the approvalStatus field in ProblemVersion from 0 to 1
    const oldApprovedProblem = await db.ProblemVersion.update(
      {
        approvalStatus: 0,
      },
      {
        where: {
          problemId,
          approvalStatus: 1,
        },
      }
    );

    // Just update the approvalStatus field in ProblemVersion to 1 using ORM
    const newApprovedProblem = await db.ProblemVersion.update(
      {
        approvalStatus: 1,
      },
      {
        where: {
          id,
        },
      }
    );
    return newApprovedProblem;
  };

  rejectProblem = async (id, feedback) => {
    // Just update the approvalStatus field in ProblemVersion to 0 using ORM
    const updatedProblem = await db.ProblemVersion.update(
      {
        approvalStatus: 3,
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
  updateRating = async (id, rating) => {
    const problem = await db.ProblemVersion.findByPk(id);
    if (!problem) {
      return null;
    }
    const updatedProblem = await db.ProblemVersion.update(
      {
        rating: rating,
      },
      {
        where: {
          id,
        },
        returning: true,
      }
    );
    return updatedProblem;
  };
}

module.exports = ProblemsRepository;
