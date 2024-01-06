const Repository = require("./base");
class UserActivityRepository extends Repository{
    constructor() {
        super();
    }

    updateOnFailedAttempt = async (user_id,problem_id) => {
        console.log("lets see"+problem_id);
        const query = `
        INSERT INTO Activity (user_id, problem_id, conseq_failed_attempt, is_solved, last_solve_timestamp, last_successful_solve_timestamp, total_failed_attempt, total_successful_attempt)
        VALUES ($1, $2, $3, $4, $5, NULL, $6, $7 )
        ON CONFLICT (user_id, problem_id) DO UPDATE
        SET
        conseq_failed_attempt = Activity.conseq_failed_attempt + 1,
        is_solved = Activity.is_solved,
        total_failed_attempt=Activity.total_failed_attempt + 1,
        last_solve_timestamp = $5;
        `;
        const params = [user_id,problem_id,1,false,Date.now(),1,0];
        const result = await this.query(query, params);
        return result;
    };

    updateOnSuccessfulAttempt = async (user_id,problem_id) => {
        //console.log("lets see"+problem_id);
        const query = `
        INSERT INTO Activity (user_id, problem_id, conseq_failed_attempt, is_solved, last_solve_timestamp, last_successful_solve_timestamp, total_failed_attempt, total_successful_attempt)
        VALUES ($1, $2, $3, $4, $5, $5, $6, $7)
        ON CONFLICT (user_id, problem_id) DO UPDATE
        SET
        conseq_failed_attempt = $3,
        is_solved = $4,
        last_successful_solve_timestamp = $5,
        total_successful_attempt=Activity.total_successful_attempt+1,
        last_solve_timestamp = $5;
        `;
        const params = [user_id,problem_id,0,true,Date.now(),0,1];
        const result = await this.query(query, params);
        return result;
    };


}
module.exports=UserActivityRepository;
