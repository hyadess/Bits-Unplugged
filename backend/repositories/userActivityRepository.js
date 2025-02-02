const Repository = require("./base");
const db = require("../models/index");
const DailyActivityRepository = require("../repositories/dailyActivityRepository");
const dailyActivityRepository = new DailyActivityRepository();
class UserActivityRepository extends Repository {
  constructor() {
    super();
  }

  getProblemDetails = async (userId, problemId) => {
    return await db.Activity.findOne({ where: { userId, problemId } });
  };
  trackDuration = async (userId, problemId, duration, timestamp) => {
    dailyActivityRepository.Entry(userId, problemId, duration, timestamp);
    const activity = db.Activity.findOne({ where: { userId, problemId } }).then(
      function (obj) {
        // update
        if (obj) {
          if (obj.isSolved && obj.viewDuration !== 0) return; // Change needed
          console.log("Updated:", duration);
          return obj.update({
            viewDuration: obj.viewDuration + duration,
            updatedAt: timestamp,
          });
        }
        // insert
        return db.Activity.create({
          userId: userId,
          problemId: problemId,
          viewDuration: duration,
          conseqFailedAttempt: 0,
          isSolved: null,
          lastSolveTimestamp: null,
          lastSuccessfulSolveTimestamp: null,
          totalFailedAttempt: 0,
          createdAt: timestamp ?? new Date(),
          updatedAt: timestamp ?? new Date(),
        });
      }
    );
    return activity;
  };
  updateOnFailedAttempt = async (userId, problemId) => {
    const activity = db.Activity.findOne({ where: { userId, problemId } }).then(
      function (obj) {
        // update
        if (obj)
          return obj.update({
            conseqFailedAttempt: obj.conseqFailedAttempt + 1,
            isSolved: obj.isSolved || false,
            lastSolveTimestamp: Date.now(),
            totalFailedAttempt: obj.totalFailedAttempt + 1,
          });
        // insert
        return db.Activity.create({
          userId: userId,
          problemId: problemId,
          conseqFailedAttempt: 1,
          isSolved: false,
          lastSolveTimestamp: Date.now(),
          lastSuccessfulSolveTimestamp: null,
          totalFailedAttempt: 1,
          viewDuration: 0,
        });
      }
    );
    return activity;
    // return instance;
    // console.log("Hi");
    // const query = `
    //     INSERT INTO "Activities" ("userId", "problemId", "conseqFailedAttempt", "isSolved", "lastSolveTimestamp", "lastSuccessfulSolveTimestamp", "totalFailedAttempt")
    //     VALUES ($1, $2, $3, $4, $5, NULL, $6)
    //     ON CONFLICT ("userId", "problemId") DO UPDATE
    //     SET
    //     "conseqFailedAttempt" = "Activities"."conseqFailedAttempt" + 1,
    //     "isSolved" = "Activities"."isSolved",
    //     "totalFailedAttempt" = "Activities"."totalFailedAttempt" + 1,
    //     "lastSolveTimestamp" = $5
    //     returning *;
    //     `;
    // const params = [userId, problemId, 1, false, null, 1];
    // const result = await this.query(query, params);
    // console.log(result.data);
    // return result.data;
  };

  updateOnSuccessfulAttempt = async (userId, problemId) => {
    console.log("lets see" + problemId);
    const activity = db.Activity.findOne({ where: { userId, problemId } }).then(
      function (obj) {
        // update
        if (obj)
          return obj.update({
            conseqFailedAttempt: 0,
            isSolved: true,
            lastSolveTimestamp: Date.now(),
            lastSuccessfulSolveTimestamp: Date.now(),
          });
        // insert
        return db.Activity.create({
          userId: userId,
          problemId: problemId,
          conseqFailedAttempt: 0,
          isSolved: true,
          lastSolveTimestamp: Date.now(),
          lastSuccessfulSolveTimestamp: Date.now(),
          totalFailedAttempt: 0,
          viewDuration: 0,
        });
      }
    );
    return activity;
  };

  //new ones...

  totalSuccessfulAttempts = async () => {
    const query = `
        SELECT
        "S"."id",
        "S"."name",
        SUM(CASE WHEN "A"."isSolved" THEN 1 ELSE 0 END) AS "totalSuccessfulAttemptsPerSeries"
        FROM
        "Series" "S"
        JOIN
        "Problems" "P" ON "S"."id" = "P"."seriesId"
        JOIN
        "Activities" "A" ON "P"."id" = "A"."problemId"
        GROUP BY
        "S"."id";
        `;
    const params = [];
    const result = await this.query(query, params);
    return result;
  };

  totalFailedAttempts = async () => {
    const query = `
        SELECT
        "S"."id",
        "S"."name",
        SUM("A"."totalFailedAttempt") AS "totalFailedAttemptsPerSeries"
        FROM
        "Series" "S"
        JOIN
        "Problems" "P" ON "S"."id" = "P"."seriesId"
        JOIN
        "Activities" "A" ON "P"."id" = "A"."problemId"
        GROUP BY
        "S"."id";
        `;
    const params = [];
    const result = await this.query(query, params);
    return result;
  };

  totalSolvedProblemsByUser = async (userId) => {
    const query = `
        SELECT
        "S"."id",
        "S"."name",
        SUM(CASE WHEN "A"."isSolved" THEN 1 ELSE 0 END) AS "totalSuccessfulAttemptsPerSeries"
        FROM
        "Series" "S"
        JOIN
        "ProblemVersions" "P" ON "S"."id" = "P"."seriesId"
        JOIN
        "Activities" "A" ON "P"."id" = "A"."problemId"
        WHERE "A"."userId" = $1
        GROUP BY
        "S"."id","S"."name"
        HAVING SUM(CASE WHEN "A"."isSolved" THEN 1 ELSE 0 END) > 0
        ORDER BY "totalSuccessfulAttemptsPerSeries" DESC
        ;
        `;
    const params = [userId];
    const result = await this.query(query, params);
    return result;
  };

  totalFailedAttemptsByUser = async (userId) => {
    const query = `
        SELECT
        "S"."id",
        "S"."name",
        SUM("A"."totalFailedAttempt") AS "totalFailedAttemptsPerSeries"
        FROM
        "Series" "S"
        JOIN
        "ProblemVersions" "P" ON "S"."id" = "P"."seriesId"
        JOIN
        "Activities" "A" ON "P"."id" = "A"."problemId"
        WHERE "A"."userId" = $1 
        GROUP BY
        "S"."id","S"."name"
        HAVING SUM("A"."totalFailedAttempt") > 0
        ORDER BY "totalFailedAttemptsPerSeries" DESC;
        `;
    const params = [userId];
    const result = await this.query(query, params);
    return result;
  };

  totalSuccessfulAttemptsBySeries = async (seriesId) => {
    const query = `
        SELECT
        "S"."id",
        "S"."name",
        SUM(CASE WHEN "A"."isSolved" THEN 1 ELSE 0 END) AS "totalSuccessfulAttemptsPerSeries"
        FROM
        "Series" "S"
        JOIN
        "ProblemVersions" "P" ON "S"."id" = "P"."seriesId"
        JOIN
        "Activities" "A" ON "P"."id" = "A"."problemId"
        WHERE "S"."id" = $1
        GROUP BY
        "S"."id";
        `;
    const params = [seriesId];
    const result = await this.query(query, params);
    return result;
  };

  totalFailedAttemptsBySeries = async (seriesId) => {
    const query = `
        SELECT
        "S"."id",
        "S"."name",
        SUM("A"."totalFailedAttempt") AS "totalFailedAttemptsPerSeries"
        FROM
        "Series" "S"
        JOIN
        "ProblemVersions" "P" ON "S"."id" = "P"."seriesId"
        JOIN
        "Activities" "A" ON "P"."id" = "A"."problemId"
        WHERE "S"."id" = $1
        GROUP BY
        "S"."id";
        `;
    const params = [seriesId];
    const result = await this.query(query, params);
    return result;
  };

  mostRecentFailsByUser = async (username) => {
    const query = `
    SELECT A.*, PV."title",
    PV."rating", S."name" AS "series", T."name" AS "topic"
    FROM "Activities" A
    JOIN "ProblemVersions" PV ON A."problemId" = PV."id"
    JOIN "Users" U ON A."userId" = U."id"
    JOIN "Series" S ON PV."seriesId" = S."id"
    JOIN "Topics" T ON S."topicId" = T."id"
    WHERE U."username" = $1 AND A."isSolved" = FALSE
    ORDER BY A."lastSolveTimestamp" DESC;
    `;
    const params = [username];
    const result = await this.query(query, params);
    return result;
  };

  successesByUser = async (username) => {
    const query = `
    SELECT A.*, PV."title"
    FROM "Activities" A
    JOIN "ProblemVersions" PV ON A."problemId" = PV."id"
    JOIN "Users" U ON A."userId" = U."id"
    WHERE U."username" = $1 AND A."isSolved" = TRUE;
    `;
    const params = [username];
    const result = await this.query(query, params);
    return result;
  };

  successesByProblem = async (problemId) => {
    const query = `
    SELECT A.*, PV."title"
    FROM "Activities" A
    JOIN "ProblemVersions" PV ON A."problemId" = PV."id"
    WHERE A."problemId" = $1 AND A."isSolved" = TRUE;
    `;
    const params = [problemId];
    const result = await this.query(query, params);
    return result;
  };

  totalProblemCountByTopic = async (topicId) => {
    const query = `
      SELECT
      T."id",
      COUNT(DISTINCT P."problemId") AS total_problems
      FROM
      "Topics" T
      JOIN
      "Series" S ON T."id" = S."topicId"
      JOIN
      "ProblemVersions" P ON S."id" = P."seriesId"
      WHERE
      T."id" = $1
      GROUP BY
      T."id"
      `;
    const params = [topicId];
    const result = await this.query(query, params);
    return result;
  };

  totalSolvedProblemCountByTopic = async (topicId, userId) => {
    const query = `
      SELECT
      T."id",
      T."name",
      COUNT(P."problemId") AS total_solved_problems
      FROM
      "Topics" T
      JOIN
      "Series" S ON T."id" = S."topicId"
      JOIN
      "ProblemVersions" P ON S."id" = P."seriesId"
      JOIN
      "Activities" A ON P."id" = A."problemId"
      WHERE
      T."id" = $1 AND A."userId" = $2 AND A."isSolved" = TRUE
      GROUP BY
      T."id"
      `;
    const params = [topicId, userId];
    const result = await this.query(query, params);
    return result;
  };
  totalSolvedProblemCount = async (userId) => {
    const query = `
      SELECT
      T."id",
      T."name",
      COUNT(P."problemId") AS total_solved_problems
      FROM
      "Topics" T
      JOIN
      "Series" S ON T."id" = S."topicId"
      JOIN
      "ProblemVersions" P ON S."id" = P."seriesId"
      JOIN
      "Activities" A ON P."id" = A."problemId"
      WHERE
      A."userId" = $1 AND A."isSolved" = TRUE
      GROUP BY
      T."id", T."name"
      `;
    const params = [userId];
    const result = await this.query(query, params);
    return result;
  };

  acceptanceByProblem = async (problemId) => {
    const query = `
    SELECT
    "problemId",
    SUM("successful_submission") AS "successful_submissions",
    SUM("failed_submission") AS "failed_submissions"
    FROM (
    SELECT
        "S"."problemId",
        "S"."userId",
        COUNT(DISTINCT CASE WHEN "S"."verdict" = 'Accepted' THEN 1 END) AS "successful_submission",
        SUM(CASE WHEN "S"."verdict" = 'Wrong answer' THEN 1 ELSE 0 END) AS "failed_submission"
    FROM
        "Submissions" "S"
    WHERE
        "S"."problemId" = $1
    GROUP BY
        "S"."problemId", "S"."userId"
    ) AS subquery
    GROUP BY
    "problemId";
    `;
    const params = [problemId];
    const result = await this.query(query, params);
    return result;
  };

  isSolvedByUser = async (userId, problemId) => {
    const query = `
    SELECT
    "isSolved"
    FROM
    "Activities"
    WHERE
    "userId" = $1 AND "problemId" = $2;
    `;
    const params = [userId, problemId];
    const result = await this.query(query, params);
    return result;
  };
}

module.exports = UserActivityRepository;
