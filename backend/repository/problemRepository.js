const Repository = require("./base");
const SeriesRepository = require("./seriesRepository");
const seriesRepository = new SeriesRepository();
const CanvasRepository = require("./canvasRepository");
const canvasRepository = new CanvasRepository();

class ProblemsRepository extends Repository {
  constructor() {
    super();
  }

  getAllProblems = async () => {
    const query = `
    SELECT * FROM "Problems";
    `;
    const params = [];
    const result = await this.query(query, params);
    return result;
  };

  getSubmittedProblems = async () => {
    const query = `
    SELECT * FROM "LiveProblems";
    `;
    const params = [];
    const result = await this.query(query, params);
    return result;
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
      FROM "LiveProblems" LP
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
    FROM "LiveProblems" LP
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
    FROM "LiveProblems" LP
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
    const query = `
    SELECT P.*, C.name as "canvasName" 
    FROM "Problems" P
    LEFT JOIN "Canvases" C
    ON P."canvasId" = C.id
    WHERE P."id" = $1;
    `;
    const params = [problemId];
    const result = await this.query(query, params);
    console.log(result.data);
    return result;
  };

  getPublishedProblemById = async (problemId) => {
    const query = `
    SELECT P."id", St.*, S.name as "seriesName", T.name as "topicName" 
    FROM "Problems" P
    LEFT JOIN "Series" S
    ON P."seriesId" = S.id
    LEFT JOIN "Topics" T
    ON S."topicId" = T.id
    LEFT JOIN "LiveProblems" St
    ON St."stateId" = P."submit_stateId"
    WHERE P."id" = $1 AND P."isLive" = TRUE;
    `;
    const params = [problemId];
    const result = await this.query(query, params);
    return result;
  };

  deleteProblem = async (problemId) => {
    const query = `
    DELETE FROM "Problems"
    WHERE "problemId" = $1;
    `;
    const params = [problemId];
    const result = await this.query(query, params);
    return result;
  };

  submitProblem = async (problemId) => {
    const result1 = await this.getProblemById(problemId);
    // Need fixing
    // if (result1.success) {
    //   const prob = result1.data[0];
    //   if (prob."submit_stateId" !== null) {
    //     const query = `
    //       UPDATE "LiveProblems"
    //       SET "title" = $2, "statement" = $3, "canvasData" = $4, "checkerCode" = $5, "params" = $6, "previewOptions" = $7, "previewOptions" = $8, "updatedAt" = $9, "canvasId" = $10, "checkerCanvas" = $11
    //       WHERE "stateId" = $1;
    //     `;
    //     const params = [
    //       prob."submit_stateId",
    //       prob."title",
    //       prob."statement",
    //       prob."canvasData",
    //       prob."checkerCode",
    //       prob."params",
    //       prob."previewOptions",
    //       prob."previewOptions",
    //       Date.now(),
    //       prob."canvasId",
    //       prob."checkerCanvas",
    //     ];
    //     const result2 = await this.query(query, params);
    //     if (result2.success) {
    //       const query = `
    //       UPDATE "Problems"
    //       SET "isLive" = $2
    //       WHERE "problemId" = $1;
    //     `;
    //       const params = [problemId, false];
    //       const result3 = await this.query(query, params);
    //       return result3;
    //     }
    //   } else {
    //     const query = `
    //       INSERT INTO "LiveProblems" ("title", "statement", "canvasData", ${
    //       prob."checkerType" == 0 ? "checkerCode" : "checkerCanvas"
    //     }, "params", "previewOptions", "previewOptions", "updatedAt", "canvasId")
    //       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    //       RETURNING "stateId";
    //     `;
    //     const params = [
    //       prob."title",
    //       prob."statement",
    //       prob."canvasData",
    //       prob."solutionChecker",
    //       prob."params",
    //       prob."previewOptions",
    //       prob."previewOptions",
    //       Date.now(),
    //       prob."canvasId",
    //     ];
    //     const result2 = await this.query(query, params);
    //     if (result2.success) {
    //       const query = `
    //       UPDATE "Problems"
    //       SET "submit_stateId" = $2, "isLive" = $3
    //       WHERE "problemId" = $1;
    //     `;
    //       const params = [problemId, result2.data[0]."stateId", false];
    //       const result3 = await this.query(query, params);
    //       return result3;
    //     }
    //   }
    // }
  };

  publishProblem = async (problemId) => {
    const query = `
    UPDATE "Problems"
    SET "isLive" = TRUE
    WHERE "problemId" = $1;
    `;
    const params = [problemId];
    const result = await this.query(query, params);
    return result;
  };

  unpublishProblem = async (problemId) => {
    const query = `
    UPDATE "Problems"
    SET "isLive" = FALSE
    WHERE "problemId" = $1;
    `;
    const params = [problemId];
    const result = await this.query(query, params);
    return result;
  };

  updateTitle = async (problemId, title) => {
    const query = `
    UPDATE "Problems"
    SET "title" = $2, "updatedAt" = $3
    WHERE "problemId" = $1;
    `;
    const params = [problemId, title, Date.now()];
    const result = await this.query(query, params);
    return result;
  };

  updateStatement = async (problemId, statement) => {
    const query = `
    UPDATE "Problems"
    SET "statement" = $2, "updatedAt" = $3
    WHERE "problemId" = $1;
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
    WHERE "problemId" = $1;
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
    UPDATE "Problems"
    SET "seriesId" = $2
    WHERE "problemId" = $1;
    `;
    const params = [problemId, seriesId];
    const result = await this.query(query, params);
    return result;
  };

  updateSerial = async (problemId, serialNo) => {
    const query = `
    UPDATE "Problems"
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
    WHERE "problemId" = $1;
    `;
    const params = [problemId, solutionChecker, Date.now()];
    const result = await this.query(query, params);
    return result;
  };

  addProblem = async (setterId, data) => {
    const query = `
      INSERT INTO "Problems" ("setterId", "title", "updatedAt")
      VALUES ($1, $2, $3)
      RETURNING "problemId";
      `;
    const params = [setterId, data.title, Date.now()];
    const result = await this.query(query, params);
    return result;
  };
}

module.exports = ProblemsRepository;
