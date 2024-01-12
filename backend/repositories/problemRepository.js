const Repository = require("./base");
const SeriesRepository = require("./seriesRepository");
const seriesRepository = new SeriesRepository();
const CanvasRepository = require("./canvasRepository");
const canvasRepository = new CanvasRepository();
const db = require("../models/index");

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
        createdAt: db.Sequelize.literal(`("problemId", "createdAt") IN (
          SELECT "problemId", MAX("createdAt") as "latestCreatedAt"
          FROM "ProblemVersions"
          GROUP BY "problemId"
        )`),
      },
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
    const query = `
    SELECT P.*, C.name as "canvasName" 
    FROM "Problems" P
    LEFT JOIN "Canvases" C
    ON P."canvasId" = C.id
    WHERE "setterId" = $1;
    `;
    const params = [setterId];
    const result = await this.query(query, params);
    console.log(result);
    return result;
  };

  getProblemsBySeries = async (seriesId) => {
    const query = `
      SELECT LP.*, S.name as "seriesName", T.name as "topicName" 
      FROM "ProblemVersions" LP
      JOIN "Series" S
      ON LP."seriesId" = S.id
      JOIN "Topics" T
      ON S."topicId" = T.id
      WHERE S.id = $1
      AND LP."isLive" = TRUE;
    `;
    const params = [seriesId];
    const result = await this.query(query, params);
    return result;
  };

  getUnsolvedProblemsBySeries = async (userId, seriesId) => {
    const query = `
    SELECT LP.*, 
    S.name AS "seriesName", 
    T.name AS "topicName" 
    FROM "ProblemVersions" LP
    JOIN "Series" S ON LP."seriesId" = S.id
    JOIN "Topics" T ON S."topicId" = T.id
    LEFT JOIN "Activities" U ON LP."problemId" = U."problemId" AND U."userId" = $1
    WHERE (U."userId" IS NULL OR U."isSolved" = FALSE)
    AND LP."isLive" = TRUE
    AND S.id = $2;
    `;
    const params = [userId, seriesId];
    const result = await this.query(query, params);
    return result;
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

  getProblemsByTopic = async (topicId) => {
    const query = `
    SELECT * 
    FROM "Problems" P
    JOIN "Series" A
    ON P."seriesId" = A."seriesId"
    WHERE A."topicId" = $1;
    `;
    const params = [topicId];
    const result = await this.query(query, params);
    return result;
  };

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

  updateTitle = async (problemId, title) => {
    const query = `
    UPDATE "Problems"
    SET "title" = $2, "updatedAt" = $3
    WHERE "id" = $1;
    `;
    const params = [problemId, title, Date.now()];
    const result = await this.query(query, params);
    return result;
  };

  updateStatement = async (problemId, statement) => {
    const query = `
    UPDATE "Problems"
    SET "statement" = $2, "updatedAt" = $3
    WHERE "id" = $1;
    `;
    const params = [problemId, statement, Date.now()];
    const result = await this.query(query, params);
    return result;
  };

  updateCanvas = async (
    problemId,
    canvasId,
    canvasData,
    editOptions,
    previewOptions
  ) => {
    console.log("=>", canvasData);
    const query = `
    UPDATE "Problems"
    SET "canvasId" = $2, "canvasData" = $3, "editOptions" = $4, "previewOptions" = $5, "updatedAt" = $6
    WHERE "id" = $1;
    `;
    const params = [
      problemId,
      canvasId,
      canvasData,
      editOptions,
      previewOptions,
      Date.now(),
    ];
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

  updateSerial = async (problemId, serialNo) => {
    const query = `
    UPDATE "ProblemVersions"
    SET "serialNo" = $2
    WHERE "problemId" = $1;
    `;
    const params = [problemId, serialNo];
    const result = await this.query(query, params);
    return result;
  };

  updateSolutionChecker = async (problemId, solutionChecker, checkerType) => {
    const query = `
    UPDATE "Problems"
    SET ${
      checkerType == 0 ? '"checkerCode"' : '"checkerCanvas"'
    } = $2, "updatedAt" = $3
    WHERE "id" = $1;
    `;
    const params = [problemId, solutionChecker, Date.now()];
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
}

module.exports = ProblemsRepository;
