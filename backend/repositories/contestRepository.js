const db = require("../models");
const Repository = require("./base");
const { Op } = require("sequelize");
const sendMail = require("../services/email");

class ContestRepository extends Repository {
  constructor() {
    super();
  }
  //*************ABOUT CONTEST****************** */
  // user side. get contest info.
  getAllContests = async () => {
    // write a sequelize query to get all contests with owner and collaboratos
    return await db.Contest.findAll({
      where: {
        status: {
          [Op.or]: ["scheduled", "rated"],
        },
      },
      order: [["updatedAt", "DESC"]],
      include: [
        {
          model: db.User,
          as: "owner",
        },
        {
          model: db.Collaborator,
          as: "collaborators",
          required: false,
          where: {
            status: "accepted",
          },
          include: [
            {
              model: db.User,
              as: "setter",
            },
          ],
        },
      ],
    });
  };

  //dihan!!!!!!!...........JOIN userRating table on contestid and there you can find everything you want (rating change, rank)..
  //for solveCount, contestSubmission JOIN,,,,,,,,,,,,,,,,
  ///evabe query korte parina!!!!!!!!

  getAllParticipatedContests = async (userId) => {
    // write a sequelize query to get all contests that the user has submissions in
    return await db.Contest.findAll({
      include: [
        // {
        //   model: db.ContestProblem,
        //   attributes: ["id"],
        //   required: true,
        //   as: "problems",
        //   include: [
        //     {
        //       model: db.ContestSubmission,
        //       attributes: ["id"], // We don't need to return any attributes from the ContestSubmission table
        //       required: true,
        //       as: "submissions",
        //       include: {
        //         model: db.Participant,
        //         as: "participant",
        //         attributes: ["userId"], // We don't need to return any attributes from the Participant table
        //         required: true,
        //         where: {
        //           userId: userId,
        //         },
        //       },
        //     },
        //   ],
        // },
        {
          model: db.UserRating,
          required: true,
          as: "ratings",
          where: {
            userId: userId,
          },
        },
      ],
    });
  };
  getSubmittedContests = async () => {
    // write a sequelize query to get all contests with owner and collaboratos
    return await db.Contest.findAll({
      where: {
        status: {
          [Op.or]: ["requested", "approved", "scheduled"],
        },
      },
      order: [["updatedAt", "DESC"]],
      include: [
        {
          model: db.User,
          as: "owner",
        },
        {
          model: db.Collaborator,
          as: "collaborators",
          required: false,
          where: {
            status: "accepted",
          },
          include: [
            {
              model: db.User,
              as: "setter",
            },
          ],
        },
      ],
    });
  };
  updateContest = async (id, data) => {
    const [updatedRowsCount, [updatedContest]] = await db.Contest.update(data, {
      returning: true,
      where: {
        id,
      },
    });
    if (updatedRowsCount === 0) {
      return null;
    }
    return updatedContest.get();
  };
  getEditorial = async (id) => {
    // get editorial column of contest table
    const contest = await db.Contest.findByPk(id, {
      attributes: ["editorial"],
    });

    // Return just the editorial attribute
    return contest ? contest.editorial : null;
  };
  // decrecated
  getAllPublishedContests = async () => {
    const query = `
        SELECT * FROM "Contests" WHERE "status" IN ('upcoming','running', 'completed');
        `;
    const params = [];
    const result = await this.query(query, params);
    return result;
  };

  // only be visible to collaborators
  getMyContests = async (setterId) => {
    const query = `
      SELECT "C".*,
      jsonb_build_object('userId', "U".id, 'username', "U"."username", 'image', "U"."image") AS "owner"
      FROM
      "Contests" "C"
      JOIN
      "Collaborators" "CB" ON "C"."id" = "CB"."contestId"
      JOIN "Users" "U" ON "C"."ownerId" = "U"."id"
      WHERE 
      "CB"."setterId" = $1 AND "CB"."status"='accepted';
    `;
    const params = [setterId];
    const result = await this.query(query, params);
    return result;
  };
  // only contests where I am the OWNER
  getMyOwnContests = async (setterId) => {
    const query = `
      SELECT "C".*,
      jsonb_build_object('userId', "U".id, 'username', "U"."username", 'image', "U"."image") AS "owner"
      FROM "Contests" "C"
      JOIN "Users" "U" ON "C"."ownerId" = "U"."id"
      WHERE "C"."ownerId" = $1;
    `;

    const params = [setterId];
    const result = await this.query(query, params);
    return result;
  };
  getRunningContests = async () => {
    const query = `
      SELECT "C".*,
      COUNT("P"."id") as "totalParticipants"
      FROM "Contests" "C"
      JOIN "Participants" "P" ON "P"."contestId" = "C"."id"
      WHERE "C"."startDateTime" <= CURRENT_TIMESTAMP 
      AND ("C"."startDateTime" + INTERVAL '1 hour' * "C"."duration") >= CURRENT_TIMESTAMP
      AND "C"."status" = 'scheduled'
      AND "P"."type" = 0
      GROUP BY "C"."id";
      `;
    const params = [];
    const result = await this.query(query, params);
    return result;
  };

  getUpcomingContests = async () => {
    const query = `
      SELECT "C".*,
      COUNT("P"."id") as "totalParticipants"
      FROM "Contests" "C"
      JOIN "Participants" "P" ON "P"."contestId" = "C"."id"
      WHERE "C"."startDateTime" > CURRENT_TIMESTAMP
      AND "C"."status" = 'scheduled'
      AND "P"."type" = 0
      GROUP BY "C"."id"
      ORDER BY "C"."startDateTime" ASC
      LIMIT 1;
      `;
    const params = [];
    const result = await this.query(query, params);
    return result;
  };

  getContestInfo = async (contestId) => {
    const query = `
        SELECT
        "C".*,
        jsonb_build_object('userId', "U".id, 'username', "U"."username", 'image', "U"."image", 'email', "Cr".email) AS "owner", SUM("CP"."rating") AS "totalPoints"
        FROM
        "Contests" "C"
        JOIN
        "Users" "U" ON "C"."ownerId" = "U"."id"
        JOIN
        "Credentials" "Cr" ON "U"."id" = "Cr"."userId"
        LEFT JOIN 
        "ContestProblems" "CP" ON "C"."id" = "CP"."contestId"
        WHERE
        "C"."id" = $1
        GROUP BY "C".id, "owner";
        ;
    `;
    const params = [contestId];
    const result = await this.query(query, params);
    return result;
  };

  //***********GETTING SUBMISSIONS***********************
  getAllSubmissionsByContest = async (contestId) => {
    const query = `
        SELECT "CS".*, "U".*
        FROM "ContestSubmissions" "CS"
        JOIN "Participants" "P" ON "CS"."participantId" = "P"."id"
        JOIN "Users" "U" ON "P"."userId" = "U"."id"
        WHERE "P"."contestId" = $1
        ORDER BY "CS"."submittedAt" DESC;
        `;
    const params = [contestId];
    const result = await this.query(query, params);
    return result;
  };
  getAllSubmissionsByUserAndContest = async (contestId, username) => {
    const query = `
        SELECT "Pb"."title","CS".*, "Pb".title as "problemName"
        FROM "ContestSubmissions" "CS"
        JOIN "Participants" "P" ON "CS"."participantId" = "P"."id"
        JOIN "ContestProblems" "CP" ON "CS"."contestProblemId" = "CP"."id"
        JOIN "Problems" "Pb" ON "CP"."problemId" = "Pb"."id"
        JOIN "Users" "U" ON "P"."userId" = "U"."id"
        WHERE "P"."contestId" = $2 AND "U"."username" = $1
        ORDER BY "CS"."submittedAt" DESC;
        `;
    const params = [username, contestId];
    const result = await this.query(query, params);
    return result;
  };
  getAllSubmissionsByContestAndProblem = async (contestId, problemId) => {
    const query = `
        SELECT "CS".*, "P"."userId", "U".username, "U".fullname
        FROM "ContestSubmissions" "CS"
        JOIN "Participants" "P" ON "CS"."participantId" = "P"."id"
        JOIN "Users" "U" ON "P"."userId" = "U"."id"
        JOIN "ContestProblems" "CP" ON "CS"."contestProblemId" = "CP"."id"
        WHERE "P"."contestId" = $1 AND "CP"."problemId" = $2
        ORDER BY "CS"."submittedAt" DESC;
        `;
    const params = [contestId, problemId];
    const result = await this.query(query, params);
    return result;
  };

  isContestProblemSolved = async (userId, contestId, problemId) => {
    const query = `
        SELECT "CS"."verdict", "CS"."duration"
        FROM "ContestSubmissions" "CS"
        JOIN "Participants" "P" ON "CS"."participantId" = "P"."id"
        JOIN "ContestProblems" "CP" ON "CS"."contestProblemId" = "CP"."id"
        WHERE "P"."contestId" = $1 AND "P"."userId" = $2 AND "CP"."problemId"=$3 AND "CS"."verdict" = 'Accepted';
        `;
    const params = [contestId, userId, problemId];
    const result = await this.query(query, params);
    console.log("submissions ==>", result.data, params);
    return result;
  };

  totalProblemSolved = async (userId, contestId) => {
    const query = `
      SELECT COUNT(DISTINCT "CP"."problemId") as "totalSolved"
      FROM "ContestSubmissions" "CS"
      JOIN "Participants" "P" ON "CS"."participantId" = "P"."id"
      JOIN "ContestProblems" "CP" ON "CS"."contestProblemId" = "CP"."id"
      WHERE "P"."contestId" = $1 AND "P"."userId" = $2 AND "CS"."verdict" = 'Accepted';
    `;
    const params = [contestId, userId];
    const result = await this.query(query, params);

    return result;
  };

  //*************GETTING PROBLEMS*********************** */

  // it is for participants but contest not ended....................
  getAllContestProblemsByContest = async (contestId) => {
    const query = `
        SELECT "P".*
        FROM "Problems" "P"
        JOIN "ContestProblems" "CP" ON "P"."id" = "CP"."problemId"
        WHERE "CP"."contestId" = $1 AND "CP"."status" = 'in_contest';        
        `;
    const params = [contestId];
    const result = await this.query(query, params);
    return result;
  };
  getContestProblemById = async (contestId, problemId) => {
    const query = `
        SELECT "CP".*
        FROM "Problems" "P"
        JOIN "ContestProblems" "CP" ON "P"."id" = "CP"."problemId"
        WHERE "CP"."contestId" = $1 AND "CP"."problemId" = $2;        
        `;
    const params = [contestId, problemId];
    const result = await this.query(query, params);
    return result;
  };
  // it is for setters....................
  getAllProblemsByContest = async (userId, contestId) => {
    const query = `
    SELECT "P".*, "CP"."status", "CP"."rating",
    CASE 
        WHEN EXISTS (
            SELECT *
            FROM "ContestSubmissions" "CS"
            JOIN "Participants" "Pc" ON "CS"."participantId" = "Pc"."id"
            JOIN "ContestProblems" "CP" ON "CS"."contestProblemId" = "CP"."id"
            WHERE "Pc"."contestId" = $1 AND "Pc"."userId" = $2 AND "CP"."problemId" = "P"."id" AND "CS"."verdict" = 'Accepted'
        ) THEN true 
        WHEN EXISTS (
            SELECT *
            FROM "ContestSubmissions" "CS"
            JOIN "Participants" "Pc" ON "CS"."participantId" = "Pc"."id"
            JOIN "ContestProblems" "CP" ON "CS"."contestProblemId" = "CP"."id"
            WHERE "Pc"."contestId" = $1 AND "Pc"."userId" = $2 AND "CP"."problemId" = "P"."id" AND "CS"."verdict" = 'Wrong answer'
        ) THEN false 
        ELSE null 
    END AS "isSolved",
    "AcceptedSubmissionsCount"."acceptedCount" AS "solveCount"
    FROM "Problems" "P"
    JOIN "ContestProblems" "CP" ON "P"."id" = "CP"."problemId"
    LEFT JOIN (
      SELECT "CP"."id", COUNT(*) AS "acceptedCount"
      FROM "ContestProblems" "CP"
      JOIN "ContestSubmissions" "CS" ON "CP"."id" = "CS"."contestProblemId"
      WHERE "CP"."contestId" = $1 AND "CS"."verdict" = 'Accepted'
      GROUP BY "CP"."id"
    ) AS "AcceptedSubmissionsCount" ON "CP"."id" = "AcceptedSubmissionsCount"."id"
    WHERE "CP"."contestId" = $1;
    `;
    const params = [contestId, userId];
    const result = await this.query(query, params);
    // console.log("==>", result.data[0]);
    return result;
  };

  totalProblemCountByContest = async (contestId) => {
    const query = `
      SELECT COUNT(*) as "totalProblems"
      FROM "Problems" "P"
      JOIN "ContestProblems" "CP" ON "P"."id" = "CP"."problemId"
      WHERE "CP"."contestId" = $1;
    `;
    const params = [contestId];
    const result = await this.query(query, params);

    return result;
  };

  //*****************UPDATING CONTEST TABLE************* */

  addContest = async (setterId, title) => {
    const query = `
        INSERT INTO "Contests" ("title", "description", "status", "ownerId", "updatedAt")
        VALUES ($1, NULL, 'edit', $2, $3)
        RETURNING "id";          
        `;
    const params = [title, setterId, new Date()];
    const result = await this.query(query, params);
    const contestId = result.data[0].id;
    return result;
  };

  // accessContest only triggers when a change in contest setter or contest problem is done
  // Just a write a trigger in database?
  accessContest = async (contestId) => {
    const query = `
        UPDATE "Contests"
        SET "updatedAt" = $2
        WHERE "id" = $1;
        `;
    const params = [contestId, new Date(null)];
    const result = await this.query(query, params);

    return result;
  };

  updateTitle = async (contestId, title) => {
    const query = `
        UPDATE "Contests"
        SET "title" = $2, "updatedAt" = $3
        WHERE "id" = $1;
        `;
    const params = [contestId, title, new Date(null)];
    const result = await this.query(query, params);
    return result;
  };
  updateDescription = async (contestId, description) => {
    const query = `
        UPDATE "Contests"
        SET "description" = $2, "updatedAt" = $3
        WHERE "id" = $1;
        `;
    const params = [contestId, description, new Date()];
    const result = await this.query(query, params);
    return result;
  };

  // contest edit -> upcoming
  publishContest = async (contestId) => {
    const query = `
        UPDATE "Contests"
        SET "status" = 'requested'
        WHERE "id" = $1;
        `;
    const params = [contestId];
    const result = await this.query(query, params);
    return result;
  };

  // Deprecated
  // I am setting default duration 2 hr for now............
  // upcoming -> running
  startContest = async (contestId) => {
    const currentTimestamp = new Date();
    const twoHoursLater = currentTimestamp + 2 * 60 * 60 * 1000; // 2 hours in milliseconds
    const query = `
        UPDATE "Contests"
        SET "status" = 'running', "updatedAt" = $2 ,  "startDate" = $3, "endDate" = $4
        WHERE "id" = $1;
        `;
    const params = [contestId, new Date(), currentTimestamp, twoHoursLater];
    const result = await this.query(query, params);
    return result;
  };
  // running -> completed
  endContest = async (contestId) => {
    const query = `
        UPDATE "Contests"
        SET "status" = 'completed', "updatedAt" = $2 , "endDate" = $2
        WHERE "id" = $1;
        `;
    const params = [contestId, Date.now()];
    const result = await this.query(query, params);
    return result;
  };

  availableCollaborators = async (id, contestId) => {
    const query = `
      SELECT
        "U"."id",
        "U"."username",
        "U"."image"
      FROM
        "Setters" "S"
        JOIN "Users" "U"
        ON "S"."userId" = "U"."id" AND "U".id != $1
      WHERE
        "S"."isApproved" = true
        AND NOT EXISTS (
          SELECT 1
          FROM "Collaborators" "CB"
          WHERE "CB"."setterId" = "U"."id"
            AND "CB"."contestId" = $2
        );
    `;
    const params = [id, contestId];
    const result = await this.query(query, params);
    return result;
  };

  getRequestedCollaborators = async (setterId) => {
    const query = `
      SELECT
      "S"."id",
      "U"."username",
      "C"."email"
      FROM
      "Setters" "S"
      JOIN
      "Users" "U" ON "S"."userId" = "U"."id"
      JOIN
      "Credentials" "C" ON "U"."id" = "C"."userId"
      WHERE "S"."id" = $1;
      `;
    const params = [setterId];
    const result = await this.query(query, params);
    return result;
  };

  //***************UPDATING CONTEST SETTER TABLE**************** */

  //collaborator should be an author............

  // getAllAvailableCollaborators = async() =>{

  // };

  addCollaborator = async (contestId, collaboratorIds, url) => {
    const valuesPart = collaboratorIds
      .map((collaboratorId) => `(${contestId}, ${collaboratorId})`)
      .join(", ");

    // Construct the full query
    const query = `
    INSERT INTO "Collaborators" ("contestId", "setterId")
    VALUES
      ${valuesPart};
    `;

    const result = await this.query(query);

    const hudai_na = await this.accessContest(contestId);
    collaboratorIds.map(async (collaboratorId) => {
      const query2 = `SELECT "C"."email"
                    FROM "Credentials" "C"
                    JOIN "Users" "U" ON "U"."id"="C"."id"
                    WHERE "U"."id" = $1 `;
      const params = [collaboratorId];
      const result = await this.query(query2, params);
      console.log("Email : ,", result);
      sendMail(
        result.data[0].email,
        "Email Verification",
        `Please verify your email: ${url}/Accept-request?type=1&token=${contestId}`
      );
    });

    return result;
  };

  acceptInvitation = async (contestId, setterId) => {
    const query = `
      UPDATE "Collaborators"
      SET "status" = 'accepted'
      WHERE "contestId" = $1 AND "setterId" = $2;
    `;

    const params = [contestId, setterId];
    const result = await this.query(query, params);

    return result;
  };

  showAllCollaborators = async (contestId) => {
    const query2 = `
          SELECT
          "Cr"."userId",
          "S"."status",
          "U"."username",
          "U"."image",
          "Cr"."email"
          FROM
          "Collaborators" "S"
          JOIN
          "Users" "U" ON "S"."setterId" = "U"."id"
          JOIN
          "Credentials" "Cr" ON "U"."id" = "Cr"."userId"
          WHERE "S"."contestId" = $1 ;
        `;

    const params = [contestId];
    const result = await this.query(query2, params);

    return result;
  };

  // getMyRole = async (userId, contestId) => {
  //   const query = `
  //       SELECT *
  //       FROM "Collaborators"
  //       WHERE "contestId" = $1 AND "role" = 'collaborator';
  //       `;
  //   const params = [userId, contestId];
  //   const result = await this.query(query, params);

  //   return result;
  // };
  //*******************UPDATING CONTEST PROBLEM TABLE************** */

  // assuming that this problem is already added ( using frontend call)
  addProblemToContest = async (problemId, contestId) => {
    const query = `
        INSERT INTO "ContestProblems" ("contestId", "problemId", "status")
        VALUES ($1, $2, 'unpublished');        
        `;
    const params = [contestId, problemId];
    const result = await this.query(query, params);

    const hudai = await this.accessContest(contestId);
    return result;
  };

  //unpublished -> in_contest
  makeProblemEligible = async (problemId, contestId) => {
    const query = `
        UPDATE "ContestProblems"
        SET "status" = 'in_contest'
        WHERE "contestId" = $1 AND "problemId" = $2;
        `;
    const params = [contestId, problemId];
    const result = await this.query(query, params);

    const hudai = await this.accessContest(contestId);
    return result;
  };

  updateRating = async (problemId, contestId, rating) => {
    const query = `
        UPDATE "ContestProblems"
        SET "rating" = $3
        WHERE "contestId" = $1 AND "problemId" = $2;
        `;
    const params = [contestId, problemId, rating];
    const result = await this.query(query, params);

    return result;
  };
  //in_contest -> unpublished
  makeProblemNotEligible = async (problemId, contestId) => {
    const query = `
        UPDATE "ContestProblems"
        SET "status" = 'unpublished'
        WHERE "contestId" = $1 AND "problemId" = $2;
        `;
    const params = [contestId, problemId];
    const result = await this.query(query, params);

    const hudai = await this.accessContest(contestId);
    return result;
  };

  //**********************UPDATING CONTEST PARTICIPATION TABLE****************** */

  calculateAdjustedPoints = (
    actualPoints,
    submissionTime,
    numWrongAnswers,
    contestDuration
  ) => {
    // Calculate time penalty
    // console.log(submissionTime, contestDuration);
    const timePenaltyFactor = 0.9 * actualPoints; // Adjust this factor as needed
    console.log(timePenaltyFactor);
    // we need to keep 10% points remaining at the end of contest
    // so we can decrease 0.9 * actual_points in contestDuration window
    // contestDuration -> 0.9 * actual_points
    // 1 -> 0.9 * actual_points / contestDuration
    // submissionTime -> 0.9 * actual_points *
    let timePenalty =
      Math.max(0, submissionTime / contestDuration) * timePenaltyFactor;
    console.log(timePenalty);
    timePenalty = isNaN(timePenalty) ? 0 : timePenalty;

    // Calculate wrong answer penalty based on actual points
    const wrongAnswerPenaltyFactor = 0.05; // Adjust this factor as needed
    console.log(wrongAnswerPenaltyFactor);
    let wrongAnswerPenalty =
      actualPoints * wrongAnswerPenaltyFactor * numWrongAnswers;

    console.log(wrongAnswerPenalty);
    wrongAnswerPenalty = isNaN(wrongAnswerPenalty) ? 0 : wrongAnswerPenalty;

    console.log(
      "Submitted at",
      submissionTime,
      "Contest time",
      contestDuration,
      "Time penalty",
      timePenalty,
      "WA Penalty",
      wrongAnswerPenalty
    );
    // const wrong_answer_penalty = num_wrong_answers * 5;
    // Adjusted points
    // console.log(timePenalty, wrongAnswerPenalty);
    let adjustedPoints = actualPoints - timePenalty - wrongAnswerPenalty;

    // Ensure adjusted points are not negative
    adjustedPoints = Math.max(0.1 * actualPoints, adjustedPoints);

    // return Math.round(adjustedPoints / 10) * 10;
    return Math.round(adjustedPoints);
  };
  addSubmissionToContestFromParticipant = async (
    contestProblemId,
    contestId,
    participantId,
    verdict,
    canvasData,
    userActivity,
    points,
    timeTaken,
    image,
    submittedAt
  ) => {
    // get contest total time
    const contestQuery = `
      SELECT duration
      FROM "Contests"
      WHERE id = $1;
    `;
    const contestQueryResult = await this.query(contestQuery, [contestId]);

    // get number of "Wrong answer" submissions
    const waQuery = `
      SELECT CAST(COUNT("CS".*) AS INTEGER) as "nWa"
      FROM "Contests" "C"
      JOIN "ContestProblems" "CP"
      ON "C".id = "CP"."contestId" AND "C"."id" = $1
      JOIN "ContestSubmissions" "CS"
      ON "CP".id = "CS"."contestProblemId" AND "CP".id = $2
      JOIN "Participants" "P"
      ON "CS"."participantId" = $3;
    `;
    const waQueryResult = await this.query(waQuery, [
      contestId,
      contestProblemId,
      participantId,
    ]);
    console.log("WA: ", waQueryResult.data);
    // Then, insert the submission with the participantId
    const submissionQuery = `
        INSERT INTO "ContestSubmissions" ("participantId", "contestProblemId", "verdict", "canvasData", "userActivity", "points", "duration","image", "submittedAt")
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);
    `;
    const submissionParams = [
      participantId,
      contestProblemId,
      verdict,
      canvasData,
      userActivity,
      verdict === "Accepted"
        ? this.calculateAdjustedPoints(
            points,
            submittedAt,
            waQueryResult.data[0].nWa,
            contestQueryResult.data[0].duration * 60 * 60 * 1000
          )
        : 0,
      timeTaken,
      image,
      submittedAt,
    ];
    const result = await this.query(submissionQuery, submissionParams);
    return result;
  };

  // assuming that this submission is added in submissions table.......
  addSubmissionToContest = async (
    problemId,
    contestId,
    userId,
    verdict,
    canvasData,
    userActivity,
    points,
    timeTaken,
    image,
    submittedAt
  ) => {
    // If not, proceed to check for participant and insert the submission
    const participantQuery = `
      SELECT "P"."id" FROM "Participants" "P" WHERE "P"."contestId" = $1 AND "P"."userId" = $2;
    `;
    const participantParams = [contestId, userId];
    const participantResult = await this.query(
      participantQuery,
      participantParams
    );

    console.log("->", problemId, contestId, userId, participantResult);
    if (participantResult.data === 0) return { success: false, error: "mara" };
    const participantId = participantResult.data[0].id;

    //get contest problem id....this part will not be needed if the provided problem id is contest problem id
    const contestProblemQuery = `
        SELECT "CP"."id" FROM "ContestProblems" "CP" WHERE "CP"."contestId" = $1 AND "CP"."problemId" = $2;
    `;
    const contestProblemParams = [contestId, problemId];
    const contestProblemResult = await this.query(
      contestProblemQuery,
      contestProblemParams
    );
    const contestProblemId = contestProblemResult.data[0].id;

    // get contest total time
    const contestQuery = `
      SELECT duration
      FROM "Contests"
      WHERE id = $1;
    `;
    const contestQueryResult = await this.query(contestQuery, [contestId]);

    // get number of "Wrong answer" submissions
    const waQuery = `
      SELECT CAST(COUNT("CS".*) AS INTEGER) as "nWa"
      FROM "Contests" "C"
      JOIN "ContestProblems" "CP"
      ON "C".id = "CP"."contestId" AND "C"."id" = $1
      JOIN "ContestSubmissions" "CS"
      ON "CP".id = "CS"."contestProblemId" AND "CP".id = $2
      JOIN "Participants" "P"
      ON "CS"."participantId" = "P".id AND "P"."userId" = $3;
    `;
    const waQueryResult = await this.query(waQuery, [
      contestId,
      contestProblemId,
      userId,
    ]);
    console.log("WA: ", waQueryResult.data);
    // Then, insert the submission with the participantId
    const submissionQuery = `
        INSERT INTO "ContestSubmissions" ("participantId", "contestProblemId", "verdict", "canvasData", "userActivity", "points", "duration","image", "submittedAt")
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);
    `;
    const submissionParams = [
      participantId,
      contestProblemId,
      verdict,
      canvasData,
      userActivity,
      this.calculateAdjustedPoints(
        points,
        submittedAt,
        waQueryResult.data[0].nWa,
        contestQueryResult.data[0].duration * 60 * 60 * 1000
      ),
      timeTaken,
      image,
      submittedAt,
    ];
    const result = await this.query(submissionQuery, submissionParams);
    return result;
  };

  getLeaderboard = async (contestId) => {
    const query = `
        SELECT
        "U"."id",
        "U"."username",
        "U"."image",
        "U"."fullname",
        "CP"."type",
        SUM("CS"."points") AS "points"
        FROM
        "ContestSubmissions" "CS"
        JOIN
        "Participants" "CP" ON "CP"."id" = "CS"."participantId"
        JOIN
        "Contests" "C" ON "C"."id" = "CP"."contestId"
        JOIN
        "Users" "U" ON "U"."id" = "CP"."userId"
        WHERE
        "C"."id" = $1
        GROUP BY
        "U"."id","U"."username","CP"."type"
        ORDER BY
        "points" DESC;
        `;
    const params = [contestId];
    const result = await this.query(query, params);

    return result;
  };

  getRatedLeaderBoard = async (contestId) => {
    const query = `
        SELECT
        "U"."id",
        "U"."username",
        "U"."image",
        "U"."fullname",
        "CP"."type",
        "UR"."change",
        SUM("CS"."points") AS "points"
        FROM
        "ContestSubmissions" "CS"
        JOIN
        "Participants" "CP" ON "CP"."id" = "CS"."participantId"
        JOIN
        "Contests" "C" ON "C"."id" = "CP"."contestId"
        JOIN
        "Users" "U" ON "U"."id" = "CP"."userId"
        JOIN
        "UserRatings" "UR" ON "UR"."userId" = "U"."id" AND "UR"."contestId" = "C"."id"
        WHERE
        "C"."id" = $1
        GROUP BY
        "U"."id","U"."username","CP"."type","UR"."change"
        ORDER BY
        "points" DESC;
        `;
    const params = [contestId];
    const result = await this.query(query, params);

    return result;
  };

  getTimeline = async (contestId) => {
    const query = `
        SELECT
        "U"."id",
        "U"."username",
        "CS"."points",
        "CS"."submittedAt"
        FROM
        "ContestSubmissions" "CS"
        JOIN
        "Participants" "CP" ON "CP"."id" = "CS"."participantId"
        JOIN
        "Contests" "C" ON "C"."id" = "CP"."contestId"
        JOIN
        "Users" "U" ON "U"."id" = "CP"."userId"
        WHERE
        "C"."id" = $1 AND "CS"."verdict" = 'Accepted'
        
        `;
    const params = [contestId];
    const result = await this.query(query, params);

    return result;
  };

  //new ones...........

  deleteProblem = async (contestId, problemId) => {
    console.log("----->", contestId, problemId);
    // const query1 = `
    //     DELETE FROM "ContestSubmissions"
    //     WHERE "contestId" = $1 AND "problemId" = $2;
    //     `;
    const params1 = [contestId, problemId];
    // const result1 = await this.query(query1, params1);

    const query = `
        DELETE FROM "ContestProblems"
        WHERE "contestId" = $1 AND "problemId" = $2;
        `;
    const result = await this.query(query, params1);

    return result;
  };

  deleteContest = async (contestId) => {
    const query = `
        DELETE FROM "Contests"
        WHERE "id" = $1;
        `;
    const params = [contestId];
    const result = await this.query(query, params);

    return result;
  };

  //*************************************ALL ABOUT CONTEST PARTICIPANT TABLE************************ */
  // type 0 means live contest pariticipant, 1 means virtual
  participateUpcomingContest = async (userId, contestId) => {
    const query = `
    INSERT INTO "Participants" ("contestId", "userId", "type")
    SELECT $1, $2, $3
    WHERE NOT EXISTS (
        SELECT 1 FROM "Participants" 
        WHERE "contestId" = $1
        AND "userId" = $2
        AND "type" = $3
    );
    
    `;
    const params = [contestId, userId, 0];
    const result = await this.query(query, params);

    return result;
  };

  IsRegistered = async (userId, contestId) => {
    const query = `
    SELECT *
    FROM "Participants"
    WHERE "contestId" = $1
      AND "userId" = $2
      AND "type" = $3;
  `;
    const params = [contestId, userId, 0];
    const result = await this.query(query, params);

    return result;
  };

  leaveUpcomingContest = async (userId, contestId) => {
    const query = `
        DELETE FROM "Participants"
        WHERE "contestId" = $1 AND "participantId" = $2 AND "type" = $3;
        `;
    const params = [contestId, userId, 0];
    const result = await this.query(query, params);

    return result;
  };

  participateVirtualContest = async (userId, contestId) => {
    const query = `
        INSERT INTO "Participants" ("contestId", "userId", "type")
        SELECT $1, $2, $3
        WHERE NOT EXISTS (
          SELECT 1 FROM "Participants" 
          WHERE "contestId" = $1
          AND "userId" = $2
          AND "type" = $3
      );
        `;
    const params = [contestId, userId, 1];
    const result = await this.query(query, params);
    return result;
  };

  deleteVirtualParticipant = async (userId, contestId) => {
    const query = `
        DELETE FROM "Participants"
        WHERE "contestId" = $1
          AND "userId" = $2
          AND "type" = $3;
    `;

    const params = [contestId, userId, 1];
    const result = await this.query(query, params);
    return result;
  };
  showAllVirtualContestByUser = async (userId) => {
    const query = `
        SELECT C.*
        FROM "Contests" C
        JOIN "Participants" CP ON C."contestId" = CP."contestId"
        WHERE CP."participantId"= $1 AND CP."type" = $2;

        `;
    const params = [userId, 1];
    const result = await this.query(query, params);

    return result;
  };

  showLiveParticipantList = async (contestId) => {
    const query = `
        SELECT P.*
        FROM "Profile" P
        JOIN "Participants" CP ON P."userId" = CP."participantId"
        WHERE CP."contestId" = $1 AND CP."type" = $2;
        `;
    const params = [contestId, 0];
    const result = await this.query(query, params);

    return result;
  };
  showVirtualParticipantList = async (contestId) => {
    const query = `
        SELECT P.*
        FROM "Profile" P
        JOIN "Participants" CP ON P."userId" = CP."participantId"
        WHERE CP."contestId" = $1 AND CP."type" = $2;
        `;
    const params = [contestId, 1];
    const result = await this.query(query, params);

    return result;
  };

  showVirtualParticipant = async (contestId, userId) => {
    const query = `
        SELECT P.*
        FROM "Participants" P
        WHERE P."contestId" = $1 AND P."type" = $2 AND P."userId" = $3;
        `;
    const params = [contestId, 1, userId];
    const result = await this.query(query, params);

    return result;
  };

  //********************************ALL ABOUT CONTEST CLARIFICATION TABLE******************** */

  addClarification = async (contestId, title, description) => {
    const query = `
        INSERT INTO "Clarifications" ("contestId", "title", "details", "postTime")
        VALUES ($1, $2, $3, $4)
        RETURNING "clarificationId";
        `;
    const params = [contestId, title, description, new Date()];
    const result = await this.query(query, params);

    return result;
  };

  showAllClarifications = async (contestId) => {
    const query = `
        SELECT *
        FROM "Clarifications"
        WHERE "contestId" = $1;
        `;
    const params = [contestId];
    const result = await this.query(query, params);

    return result;
  };

  approveContest = async (contestId) => {
    const query = `
        UPDATE "Contests"
        SET "status" = 'approved'
        WHERE "id" = $1;
        `;
    const params = [contestId];
    const result = await this.query(query, params);
    return result;
  };

  rejectContest = async (contestId) => {
    const query = `
      UPDATE "Contests"
      SET "status" = 'rejected'
      WHERE "id" = $1;
    `;
    const params = [contestId];
    const result = await this.query(query, params);
    return result;
  };
}
module.exports = ContestRepository;
