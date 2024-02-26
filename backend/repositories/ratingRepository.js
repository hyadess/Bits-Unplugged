const Repository = require("./base");


class RatingRepository extends Repository {
    constructor() {
        super();
    }

    // getUserRatingsAndAttemptsByProblem = async (problemId) => {
    //     const query = `
    //     SELECT "S"."userId", 
    //     COALESCE("R"."rating", 800) AS "rating",
    //     COUNT(DISTINCT CASE WHEN "S"."verdict" = 'Accepted' THEN 1 END) AS "successful_submissions",
    //     SUM(CASE WHEN "S"."verdict" = 'Wrong answer' THEN 1 ELSE 0 END) AS "failed_submissions"
    //     FROM "Submissions" "S"
    //     LEFT JOIN "UserRatings" "R" ON "S"."userId" = "R"."userId"
    //     WHERE "S"."problemId" = $1
    //     GROUP BY "S"."userId", COALESCE("R"."rating", 800);
 
    //     `;
    //     const params = [problemId];
    //     const result = await this.query(query, params);
    //     return result;
    // };

    getUserRatingsAndAttemptsByProblem = async (problemId) => {
        const query = `
            SELECT "A"."userId", 
            COALESCE("R"."rating", 800) AS "rating",
            "A"."totalFailedAttempt" as "failed_submissions",
            "A"."viewDuration" as "duration",
            "A"."isSolved" as "isSolved"
            FROM "Activities" "A"
            LEFT JOIN "UserRatings" "R" ON "A"."userId" = "R"."userId"
            WHERE "A"."problemId" = $1;
        `;
        const params = [problemId];
        const result = await this.query(query, params);
        return result;
    }



    getLatestProblemsWithRatings = async () => {
        const query = `
            SELECT "P"."id", "P"."rating"
            FROM "ProblemVersions" "P"
            WHERE "P"."approvalStatus" = 1
        `;
        const result = await this.query(query);
        return result;
    };

    updateProblemRating = async (problemId, newRating) => {
        const query = `
            UPDATE "ProblemVersions"
            SET "rating" = $1
            WHERE "id" = $2
        `;
        const params = [newRating, problemId];
        const result = await this.query(query, params);
        return result;
    };
}
module.exports = RatingRepository;