const Repository = require("./base");

class RecommendationRepository extends Repository {
  constructor() {
    super();
  }

  getFamousProblemsBySeries = async (seriesId) => {
    const query = `
        SELECT "P"."id", "P"."seriesId", "P"."title", "P"."rating", 
        SUM("A"."totalFailedAttempt" + CASE WHEN "A"."isSolved" THEN 1 ELSE 0 END) AS "totalAttempts", 
        COUNT(DISTINCT "A"."userId") AS "totalUsers",
        "S"."name" AS "seriesName", "T"."name" AS "topicName"
        FROM "Activities" "A"
        JOIN "ProblemVersions" "P" ON "A"."problemId"="P"."id"
        JOIN "Series" "S" ON "P"."seriesId"="S"."id"
        JOIN "Topics" "T" ON "S"."topicId"="T"."id"
        WHERE "P"."seriesId"=$1
        GROUP BY "P"."id", "P"."seriesId", "P"."title", "P"."rating","S"."name", "T"."name"
        ORDER BY "totalAttempts" DESC
        LIMIT 5 
        `;
    const params = [seriesId];
    const result = await this.query(query, params);
    return result;
  };

  getUnsolvedProblemAroundRating = async (userId, rating) => {
    let e = rating;
    if (!Number.isInteger(rating)) {
      e = parseInt(rating);
    }

    const query = `
        SELECT "P"."id", "P"."seriesId", "P"."title", "P"."rating", "S"."name" AS "seriesName", "T"."name" AS "topicName",
        COUNT("A"."userId") AS "totalUsers"
        FROM "ProblemVersions" "P"
        JOIN "Series" "S" ON "P"."seriesId"="S"."id"
        JOIN "Topics" "T" ON "S"."topicId"="T"."id"
        JOIN "Activities" "A" ON "P"."id" = "A"."problemId"
        WHERE "P"."rating" BETWEEN ($1 - 100) AND ($1 + 100) AND "P"."id" NOT IN (
        SELECT "A"."problemId" FROM "Activities" "A" WHERE "A"."userId"=$2 AND "A"."isSolved"=TRUE
        )
        GROUP BY "P"."id", "P"."seriesId","P"."title","P"."rating","S"."name","T"."name"
        LIMIT 5
        `;
    const params = [e, userId];
    const result = await this.query(query, params);
    return result;
  };
}
module.exports = RecommendationRepository;
