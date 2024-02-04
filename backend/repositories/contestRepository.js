const Repository = require("./base");

class ContestRepository extends Repository {
  constructor() {
    super();
  }
  //*************ABOUT CONTEST****************** */
  getAllContests = async () => {
    const query = `
        SELECT
        "C".*,
        STRING_AGG("CS"."setterId"::text, ', ') AS "setters",
        STRING_AGG("CS"."role", ', ') AS "roles"
        FROM
        "Contests" "C"
        JOIN
        "ContestSetters" "CS" ON "C"."id" = "CS"."contestId"
        GROUP BY
        "C"."id";
        `;
    const params = [];
    const result = await this.query(query, params);
    return result;
  };
  getAllPublishedContests = async () => {
    const query = `
        SELECT * FROM "Contests" WHERE "status" IN ('upcoming','running', 'completed');
        `;
    const params = [];
    const result = await this.query(query, params);
    return result;
  };
  // will also be visible to collaborators
  getMyContests = async (setterId) => {
    const query = `
        SELECT "C".*, "CS"."role" AS "role"
        FROM "Contests" "C"
        JOIN "ContestSetters" "CS" ON "C"."id" = "CS"."contestId"
        WHERE "CS"."setterId" = $1;

        `;
    const params = [setterId];
    const result = await this.query(query, params);
    return result;
  };
  // only contests where I am the OWNER
  getMyOwnContests = async (setterId) => {
    const query = `
        SELECT "C".*, "CS"."role" AS "role"
        FROM "Contests" "C"
        JOIN "ContestSetters" "CS" ON "C"."id" = "CS"."contestId"
        WHERE "CS"."setterId" = $1 AND "CS"."role" = 'owner';
        `;
    const params = [setterId];
    const result = await this.query(query, params);
    return result;
  };
  getContestInfo = async (contestId) => {
    const query = `
      SELECT
      "C".*,
      jsonb_agg(jsonb_build_object('setterId', "S"."id", 'role', "CS"."role", 'username', "U"."username")) AS "ContestSetters"
      FROM
      "Contests" "C"
      JOIN
      "ContestSetters" "CS" ON "C"."id" = "CS"."contestId"
      JOIN
      "Setters" "S" ON "CS"."setterId" = "S"."id"
      JOIN
      "Users" "U" ON "S"."userId" = "U"."id"
      GROUP BY
      "C"."id";

        `;
    const params = [contestId];
    const result = await this.query(query, params);
    return result;
  };

  //***********GETTING SUBMISSIONS***********************
  getAllSubmissionsByContest = async (contestId) => {
    const query = `
        SELECT "CP".*, "S".*
        FROM "ContestSubmissions" "CP"
        JOIN "Submissions" "S" ON "CP"."submissionId" = "S"."submissionId"
        WHERE "CP"."contestId" = $1;
        `;
    const params = [contestId];
    const result = await this.query(query, params);
    return result;
  };
  getAllSubmissionsByUserAndContest = async (userId, contestId) => {
    const query = `
        SELECT "CP".*, "S".*
        FROM "ContestSubmissions" "CP"
        JOIN "Submissions" "S" ON "CP"."submissionId" = "S"."submissionId"
        WHERE "CP"."contestId" = $2 AND "CP"."userId" = $1;
        `;
    const params = [userId, contestId];
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
  // it is for setters....................
  getAllProblemsByContest = async (contestId) => {
    const query = `
        SELECT "P".*, "CP"."status"
        FROM "Problems" "P"
        JOIN "ContestProblems" "CP" ON "P"."id" = "CP"."problemId"
        WHERE "CP"."contestId" = $1;        
        `;
    const params = [contestId];
    const result = await this.query(query, params);
    return result;
  };

  //*****************UPDATING CONTEST TABLE************* */

  addContest = async (setterId,title) => {
    const query = `
        INSERT INTO "Contests" ("title", "description", "startDate", "endDate", "status", "updatedAt")
        VALUES ($1, NULL, NULL, NULL, 'edit', $2)
        RETURNING "id";          
        `;
    const params = [title,new Date("February 1, 2024 11:13:00")];
    const result = await this.query(query, params);
    const contestId = result.data[0].id;

    const query2 = `
        INSERT INTO "ContestSetters" ("contestId", "setterId", "role")
        VALUES ($1, $2, 'owner');
        `;
    const params2 = [contestId, setterId];
    const result2 = await this.query(query2, params2);

    return result;
  };

  // updateContest only triggers when a change in contest setter or contest problem is done
  updateContest = async (contestId) => {
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
        SET "status" = 'upcoming', "updatedAt" = $2
        WHERE "id" = $1;
        `;
    const params = [contestId, new Date()];
    const result = await this.query(query, params);
    return result;
  };
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
    const params = [contestId, new Date()];
    const result = await this.query(query, params);
    return result;
  };

  //***************UPDATING CONTEST SETTER TABLE**************** */

  //collaborator should be an author............

  // getAllAvailableCollaborators = async() =>{

  // };

  addCollaborator = async (contestId, collaboratorId) => {
    const query = `
        INSERT INTO "ContestSetters" ("contestId", "setterId", "role")
        VALUES ($1, $2, 'collaborator');
        `;
    const params = [contestId, collaboratorId];
    const result = await this.query(query, params);

    const hudai = await this.updateContest(contestId);

    return result;
  };

  showAllCollaborators = async (contestId) => {
    const query = `
        SELECT *
        FROM "ContestSetters"
        WHERE "contestId" = $1 AND "role" = 'collaborator';
        `;
    const params = [contestId];
    const result = await this.query(query, params);

    return result;
  };

  //*******************UPDATING CONTEST PROBLEM TABLE************** */

  // assuming that this problem is already added ( using frontend call)
  addProblemToContest = async (problemId, contestId) => {
    const query = `
        INSERT INTO "ContestProblems" ("contestId", "problemId", "status")
        VALUES ($1, $2, 'unpublished');        
        `;
    const params = [contestId, problemId];
    const result = await this.query(query, params);

    const hudai = await this.updateContest(contestId);
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

    const hudai = await this.updateContest(contestId);
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

    const hudai = await this.updateContest(contestId);
    return result;
  };

  //**********************UPDATING CONTEST PARTICIPATION TABLE****************** */

  // assuming that this submission is added in submissions table.......
  addSubmissionToContest = async (
    problemId,
    contestId,
    submissionId,
    userId,
    points
  ) => {
    const query = `
        INSERT INTO "ContestSubmissions" ("contestId", "userId", "problemId", "submissionId", "points")
        VALUES ($1, $2, $3, $4, $5);
        `;
    const params = [contestId, userId, problemId, submissionId, points];
    const result = await this.query(query, params);

    return result;
  };

  //new ones...........

  deleteProblem = async (contestId, problemId) => {
    const query1 = `
        DELETE FROM "ContestSubmissions"
        WHERE "contestId" = $1 AND "problemId" = $2; 
        `;
    const params1 = [contestId, problemId];
    const result1 = await this.query(query1, params1);

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
        INSERT INTO "Participants" ("contestId", "participantId", "type")
        VALUES ($1 ,$2, $3);
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
        INSERT INTO "Participants" ("contestId", "participantId", "type")
        VALUES ($1 ,$2, $3);
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
        WHERE CP."participantId"= $1 AND CP.type = $2;

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
        WHERE CP."contestId" = $1 AND CP.type = $2;
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
        WHERE CP."contestId" = $1 AND CP.type = $2;
        `;
    const params = [contestId, 1];
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
}
module.exports=ContestRepository;