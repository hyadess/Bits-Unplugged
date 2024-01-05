const Repository = require("./base");
class SubmissionRepository extends Repository{
    constructor() {
        super();
    }

    getAllSubmissionsByUserAndProblem = async (user_id,problem_id) => {
        //console.log("lets see"+problem_id);
        const query = `
        SELECT * 
        FROM Submissions S
        WHERE S.user_id = $1 AND S.problem_id = $2;
        `;
        const params = [user_id,problem_id];
        const result = await this.query(query, params);
        return result;
    };
    getAllSubmissionsByUser = async (user_id) => {
        //console.log("lets see"+problem_id);
        const query = `
        SELECT * 
        FROM Submissions S
        WHERE S.user_id = $1;
        `;
        const params = [user_id];
        const result = await this.query(query, params);
        return result;
    };
    getAllSubmissionsByProblem = async (problem_id) => {
        //console.log("lets see"+problem_id);
        const query = `
        SELECT * 
        FROM Submissions S
        WHERE S.problem_id = $1;
        `;
        const params = [problem_id];
        const result = await this.query(query, params);
        return result;
    };



    submitSolution = async (user_id, problem_id,data) => {
        const query = `
          INSERT INTO Submissions (time_stamp, verdict, problem_id,user_id)
          VALUES ($1, $2, $3, $4)
          RETURNING submission_id;
          `;
        const params = [Date.now(),data.verdict,problem_id,user_id];
        const result = await this.query(query, params);
        return result;
    };



}
module.exports=SubmissionRepository;
