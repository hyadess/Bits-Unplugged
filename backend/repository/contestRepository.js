const Repository = require("./base");

class ContestRepository extends Repository {
  constructor() {
    super();
  }
  //*************ABOUT CONTEST****************** */
  getAllContests = async () => {
    const query = `
        SELECT
        C.*
        STRING_AGG(CS.setter_id::text, ', ') AS setters,
        STRING_AGG(CS.role, ', ') AS roles
        FROM
        Contest C
        JOIN
        Contestsetter CS ON C.contest_id = CS.contest_id
        GROUP BY
        C.contest_id;
        `;
    const params = [];
    const result = await this.query(query, params);
    return result;
  };
  getAllPublishedContests = async () => {
    const query = `
        SELECT * FROM Contest WHERE status IN ('upcoming','running', 'completed');
        `;
    const params = [];
    const result = await this.query(query, params);
    return result;
  };
  // will also be visible to collaborators
  getMyContests = async (author_id) => {
    const query = `
        SELECT C.*, CS.role as role
        FROM Contest C
        JOIN Contestsetter CS ON C.contest_id = CS.contest_id
        WHERE CS.setter_id = $1;

        `;
    const params = [author_id];
    const result = await this.query(query, params);
    return result;
  };
  // only contests where I am the OWNER
  getMyOwnContests = async (author_id) => {
    const query = `
        SELECT C.*, CS.role as role
        FROM Contest C
        JOIN Contestsetter CS ON C.contest_id = CS.contest_id
        WHERE CS.setter_id = $1 AND CS.role = 'owner';

        `;
    const params = [author_id];
    const result = await this.query(query, params);
    return result;
  };

  //***********GETTING SUBMISSIONS***********************
  getAllSubmissionsByContest = async (contest_id) => {
    const query = `
        SELECT CP.*, S.*
        FROM Contestparticipation CP
        JOIN Submissions S ON CP.submission_id = S.submission_id
        WHERE CP.contest_id = $1;
        `;
    const params = [contest_id];
    const result = await this.query(query, params);
    return result;
  };
  getAllSubmissionsByUserAndContest = async (user_id, contest_id) => {
    const query = `
        SELECT CP.*, S.*
        FROM Contestparticipation CP
        JOIN Submissions S ON CP.submission_id = S.submission_id
        WHERE CP.contest_id = $2 AND CP.user_id = $1;
        `;
    const params = [user_id, contest_id];
    console.log(user_id, contest_id);
    const result = await this.query(query, params);
    return result;
  };

  //*************GETTING PROBLEMS*********************** */

  // it is for participants but contest not ended....................
  getAllContestProblemsByContest = async (contest_id) => {
    const query = `
        SELECT P.*
        FROM Problem P
        JOIN Contestproblem CP ON P.problem_id = CP.problem_id
        WHERE CP.contest_id = $1 AND CP.status = 'in_contest';        
        `;
    const params = [contest_id];
    const result = await this.query(query, params);
    return result;
  };
  // it is for setters....................
  getAllProblemsByContest = async (contest_id) => {
    const query = `
        SELECT P.*,CP.status
        FROM Problem P
        JOIN Contestproblem CP ON P.problem_id = CP.problem_id
        WHERE CP.contest_id = $1;        
        `;
    const params = [contest_id];
    const result = await this.query(query, params);
    return result;
  };

  //*****************UPDATING CONTEST TABLE************* */

  addContest = async (author_id) => {
    const query = `
        INSERT INTO Contest (title, description, start_date, end_date, status, last_updated)
        VALUES (NULL, NULL, NULL, NULL, 'edit', $1)
        RETURNING contest_id;          
        `;
    const params = [Date.now()];
    const result = await this.query(query, params);
    const contest_id = result.data[0].contest_id;

    const query2 = `
        INSERT INTO Contestsetter (contest_id, setter_id, role)
        VALUES ($1, $2, 'owner');
        `;
    const params2 = [contest_id, author_id];
    const result2 = await this.query(query2, params2);

    return result;
  };

  // updateContest only triggers when a change in contest setter or contest problem is done
  updateContest = async (contest_id) => {
    const query = `
        UPDATE Contest
        SET last_updated = $2
        WHERE contest_id = $1;
        `;
    const params = [contest_id, Date.now()];
    const result = await this.query(query, params);

    return result;
  };

  updateTitle = async (contest_id, title) => {
    const query = `
        Update Contest
        SET title = $2, last_updated = $3
        WHERE contest_id = $1;
        `;
    const params = [contest_id, title, Date.now()];
    const result = await this.query(query, params);
    return result;
  };
  updateDescription = async (contest_id, description) => {
    const query = `
        Update Contest
        SET description = $2, last_updated = $3
        WHERE contest_id = $1;
        `;
    const params = [contest_id, description, Date.now()];
    const result = await this.query(query, params);
    return result;
  };

  // contest edit -> upcoming
  publishContest = async (contest_id) => {
    const query = `
        Update Contest
        SET status = 'upcoming', last_updated = $2
        WHERE contest_id = $1;
        `;
    const params = [contest_id, Date.now()];
    const result = await this.query(query, params);
    return result;
  };
  // I am setting default duration 2 hr for now............
  // upcoming -> running
  startContest = async (contest_id) => {
    const currentTimestamp = Date.now();
    const twoHoursLater = currentTimestamp + 2 * 60 * 60 * 1000; // 2 hours in milliseconds
    const query = `
        Update Contest
        SET status = 'running', last_updated = $2 ,  start_date = $3, end_date = $4
        WHERE contest_id = $1;
        `;
    const params = [contest_id, Date.now(), currentTimestamp, twoHoursLater];
    const result = await this.query(query, params);
    return result;
  };
  // running -> completed
  endContest = async (contest_id) => {
    const query = `
        Update Contest
        SET status = 'completed', last_updated = $2 , end_date = $2
        WHERE contest_id = $1;
        `;
    const params = [contest_id, Date.now()];
    const result = await this.query(query, params);
    return result;
  };

  //***************UPDATING CONTEST SETTER TABLE**************** */

  //collaborator should be an author............

  // getAllAvailableCollaborators = async() =>{

  // };

  addCollaborator = async (contest_id, collaborator_id) => {
    const query = `
        INSERT INTO Contestsetter (contest_id, setter_id, role)
        VALUES ($1, $2, 'collaborator');
        `;
    const params = [contest_id, collaborator_id];
    const result = await this.query(query, params);

    const hudai = await this.updateContest(contest_id);

    return result;
  };

  showAllCollaborators = async (contest_id) => {
    const query = `
        SELECT *
        FROM Contestsetter
        WHERE contest_id = $1 AND role = 'collaborator';
        `;
    const params = [contest_id];
    const result = await this.query(query, params);

    return result;
  };

  //*******************UPDATING CONTEST PROBLEM TABLE************** */

  // assuming that this problem is already added ( using frontend call)
  addProblemToContest = async (problem_id, contest_id) => {
    const query = `
        INSERT INTO Contestproblem (contest_id, problem_id, status)
        VALUES ($1, $2, 'unpublished');        
        `;
    const params = [contest_id, problem_id];
    const result = await this.query(query, params);

    const hudai = await this.updateContest(contest_id);
    return result;
  };

  //unpublished -> in_contest
  makeProblemEligible = async (problem_id, contest_id) => {
    const query = `
        UPDATE Contestproblem
        SET status = 'in_contest'
        WHERE contest_id = $1 AND problem_id = $2;
        `;
    const params = [contest_id, problem_id];
    const result = await this.query(query, params);

    const hudai = await this.updateContest(contest_id);
    return result;
  };
  //in_contest -> unpublished
  makeProblemNotEligible = async (problem_id, contest_id) => {
    const query = `
        UPDATE Contestproblem
        SET status = 'unpublished'
        WHERE contest_id = $1 AND problem_id = $2;
        `;
    const params = [contest_id, problem_id];
    const result = await this.query(query, params);

    const hudai = await this.updateContest(contest_id);
    return result;
  };

  //**********************UPDATING CONTEST PARTICIPATION TABLE****************** */

  // assuming that this submission is added in submissions table.......
  addSubmissionToContest = async (
    problem_id,
    contest_id,
    submission_id,
    user_id,
    points
  ) => {
    const query = `
        INSERT INTO Contestparticipation (contest_id, user_id, problem_id, submission_id, points)
        VALUES ($1, $2, $3, $4, $5);
        `;
        const params = [contest_id,user_id,problem_id,submission_id,points];
        const result = await this.query(query, params);

        return result;


    };

    //new ones...........

    deleteProblem = async (contest_id,problem_id) =>{
        const query1=`
        DELETE FROM Contestparticipation
        WHERE contest_id = $1, problem_id = $2; 
        `;
        const params1 = [contest_id,problem_id];
        const result1 = await this.query(query1, params1);

        const query=`
        DELETE FROM Contestproblem
        WHERE contest_id = $1, problem_id = $2;
        `;
        const result = await this.query(query, params1);

        return result;
    };



    deleteContest = async (contest_id) =>{
        const query=`
        DELETE FROM Contest
        WHERE contest_id = $1;
        `;
        const params = [contest_id];
        const result = await this.query(query, params);

        return result;
    };


    //*************************************ALL ABOUT CONTEST PARTICIPANT TABLE************************ */
    // type 0 means live contest pariticipant, 1 means virtual 
    participateUpcomingContest = async (user_id,contest_id) =>{
        const query=`
        INSERT INTO Contestparticipant (contest_id, participant_id, type)
        VALUES ($1 ,$2, $3);
        `;
        const params = [contest_id,user_id,0];
        const result = await this.query(query, params);

        return result;
    };
    leaveUpcomingContest = async (user_id,contest_id) =>{
        const query=`
        DELETE FROM Contestparticipant
        WHERE contest_id = $1 AND participant_id = $2 AND type = $3;
        `;
        const params = [contest_id,user_id,0];
        const result = await this.query(query, params);

        return result;
    };

    participateVirtualContest = async (user_id,contest_id) =>{
        const query=`
        INSERT INTO Contestparticipant (contest_id, participant_id, type)
        VALUES ($1 ,$2, $3);
        `;
        const params = [contest_id,user_id,1];
        const result = await this.query(query, params);

        return result;
    };
    leaveVirtualContest = async (user_id,contest_id) =>{
        const query=`
        DELETE FROM Contestparticipant
        WHERE contest_id = $1 AND participant_id = $2 AND type = $3;
        `;
        const params = [contest_id,user_id,1];
        const result = await this.query(query, params);

        return result;
    };

    showAllLiveContestByUser = async (user_id) => {
        const query=`
        SELECT C.*
        FROM Contest C
        JOIN Contestparticipant CP ON C.contest_id = CP.contest_id
        WHERE CP.participant_id= $1 AND CP.type = $2;

        `;
        const params = [user_id,0];
        const result = await this.query(query, params);

        return result;
    };
    showAllVirtualContestByUser = async (user_id) => {
        const query=`
        SELECT C.*
        FROM Contest C
        JOIN Contestparticipant CP ON C.contest_id = CP.contest_id
        WHERE CP.participant_id= $1 AND CP.type = $2;

        `;
        const params = [user_id,1];
        const result = await this.query(query, params);

        return result;
    };

    showLiveParticipantList = async (contest_id) =>{
        const query=`
        SELECT P.*
        FROM Profile P
        JOIN Contestparticipant CP ON P.user_id = CP.participant_id
        WHERE CP.contest_id = $1 AND CP.type = $2;
        `;
        const params = [contest_id,0];
        const result = await this.query(query, params);

        return result;
    };
    showVirtualParticipantList = async (contest_id) =>{
        const query=`
        SELECT P.*
        FROM Profile P
        JOIN Contestparticipant CP ON P.user_id = CP.participant_id
        WHERE CP.contest_id = $1 AND CP.type = $2;
        `;
        const params = [contest_id,1];
        const result = await this.query(query, params);

        return result;
    };

    //********************************ALL ABOUT CONTEST CLARIFICATION TABLE******************** */

    addClarification = async (contest_id, title, description) => {
        const query=`
        INSERT INTO Contestclarification (contest_id, title, details, post_time)
        VALUES ($1, $2, $3, $4)
        RETURNING clarification_id;
        `;
        const params = [contest_id,title, description, Date.now()];
        const result = await this.query(query, params);

        return result;
    };

    showAllClarifications = async (contest_id) => {
        const query=`
        SELECT *
        FROM Contestclarification
        WHERE contest_id = $1;
        `;
        const params = [contest_id];
        const result = await this.query(query, params);

        return result;
    };

}
module.exports=ContestRepository;
