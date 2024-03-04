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

    getProblemById = async (problemId) => {
        const query = `
            SELECT "P".*
            FROM "ProblemVersions" "P"
            WHERE "P"."id" = $1 AND "P"."approvalStatus" = 1
        `;
        const params = [problemId];
        const result = await this.query(query, params);
        return result;
    }

    updateRatingUpdated = async (problemId) => {
        const query = `
            UPDATE "ProblemVersions"
            SET "ratingUpdated" = CURRENT_TIMESTAMP
            WHERE "id" = $1
        `;
        const params = [problemId];
        const result = await this.query(query, params);
        return result;
    }



    //for user rating table............................................

    getCurrentRating = async (userId) => {
        const query = `
        SELECT "rating","position"
        FROM(
        SELECT "rating", "userId",
        RANK() OVER (ORDER BY "rating" DESC) AS "position"
        FROM "UserRatings" 
        WHERE "isLatest" = TRUE
        ) AS "R" 
        WHERE "userId" = $1;
 
        `;
        const params = [userId];
        const result = await this.query(query, params);
        return result;
    };

    showAllUserRatings = async () => {
        const query = `

            SELECT "userId", "rating"
            FROM "UserRatings"
            WHERE "isLatest" = TRUE
            ORDER BY "rating" DESC;
        `;
        const result = await this.query(query);
        return result;
    };
    

    getRatingHistory = async (userId) => {
        const query = `
            SELECT "rating", "createdAt"
            FROM "UserRatings"
            WHERE "userId" = $1
            ORDER BY "createdAt" ASC
        `;
        const params = [userId];
        const result = await this.query(query, params);
        return result;
    };

    updateRating = async (userId, contestId,newRating,prevRating,change,rank) => {
        const query = `
            UPDATE "UserRatings"
            SET "isLatest" = FALSE
            WHERE "userId" = $1
        `;
        const params = [userId];
        const result = await this.query(query, params);
        if (!result.success) {
            console.log("Error updating rating");
        }
        const query2 = `
            INSERT INTO "UserRatings" ("userId", "rating", "isLatest","contestId","change","prevRating","rank")
            VALUES ($1, $2, $7,$3,$4,$5,$6)
        `;
        const params2 = [userId, newRating,contestId,change,prevRating,rank,true];
        const result2 = await this.query(query2, params2);
        return result2;
    };





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
            SET "rating" = $1, "ratingUpdated" = CURRENT_TIMESTAMP
            WHERE "id" = $2
        `;
        const params = [newRating, problemId];
        const result = await this.query(query, params);
        return result;
    };


    //for changing rating of a user............................................


    getAllContestParticipantWithRating = async (contestId) => {
        const query = `
            SELECT "CP"."userId", 
            "R"."rating"
            FROM "Participants" "CP"
            JOIN "UserRatings" "R" ON "CP"."userId" = "R"."userId"
            WHERE "CP"."contestId" = $1 AND "CP"."type" = 0 
            AND "CP"."id" IN (SELECT "participantId" FROM "ContestSubmissions")
            ORDER BY "R"."rating" DESC;
        `;
        const params = [contestId];
        const result = await this.query(query, params);
        return result;
    }
    getAllContestParticipants = async (contestId) => {
        const query = `
            SELECT "userId"
            FROM "Participants"
            WHERE "contestId" = $1 AND "type" = 0
            AND "id" IN (SELECT "participantId" FROM "ContestSubmissions");
        `;
        const params = [contestId];
        const result = await this.query(query, params);
        return result;
    }









}
module.exports = RatingRepository;