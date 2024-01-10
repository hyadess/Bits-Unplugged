const Repository = require("./base");

class UserActivityRepository extends Repository {
  constructor() {
    super();
  }

  updateOnFailedAttempt = async (userId, problemId) => {
    console.log("lets see" + problemId);
    const query = `
        INSERT INTO "Activities" ("userId", "problemId", "conseqFailedAttempt", "isSolved", "lastSolveTimestamp", "lastSuccessfulSolveTimestamp", "totalFailedAttempt")
        VALUES ($1, $2, $3, $4, $5, NULL, $6)
        ON CONFLICT ("userId", "problemId") DO UPDATE
        SET
        "conseqFailedAttempt" = "Activities"."conseqFailedAttempt" + 1,
        "isSolved" = "Activities"."isSolved",
        "totalFailedAttempt" = "Activities"."totalFailedAttempt" + 1,
        "lastSolveTimestamp" = $5;
        `;
    const params = [userId, problemId, 1, false, Date.now(), 1];
    const result = await this.query(query, params);
    return result;
  };

  updateOnSuccessfulAttempt = async (userId, problemId) => {
    //console.log("lets see"+problemId);
    const query = `
        INSERT INTO "Activities" ("userId", "problemId", "conseqFailedAttempt", "isSolved", "lastSolveTimestamp", "lastSuccessfulSolveTimestamp", "totalFailedAttempt")
        VALUES ($1, $2, $3, $4, $5, $5, $6)
        ON CONFLICT ("userId", "problemId") DO UPDATE
        SET
        "conseqFailedAttempt" = $3,
        "isSolved" = $4,
        "lastSuccessfulSolveTimestamp" = $5,
        "lastSolveTimestamp" = $5;
        `;
    const params = [userId, problemId, 0, true, Date.now(), 0];
    const result = await this.query(query, params);
    return result;
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
        "Problems" "P" ON "S"."id" = "P"."seriesId"
        JOIN
        "Activities" "A" ON "P"."id" = "A"."problemId"
        WHERE "A"."userId" = $1
        GROUP BY
        "S"."id";
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
        "Problems" "P" ON "S"."id" = "P"."seriesId"
        JOIN
        "Activities" "A" ON "P"."id" = "A"."problemId"
        WHERE "A"."userId" = $1
        GROUP BY
        "S"."id";
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
        "Problems" "P" ON "S"."id" = "P"."seriesId"
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
        "Problems" "P" ON "S"."id" = "P"."seriesId"
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
}

module.exports = UserActivityRepository;
