const Repository = require("./base");
class UserActivityRepository extends Repository{
    constructor() {
        super();
    }

    updateOnFailedAttempt = async (user_id,problem_id) => {
        console.log("lets see"+problem_id);
        const query = `
        INSERT INTO Activity (user_id, problem_id, conseq_failed_attempt, is_solved, last_solve_time)
        VALUES ($1, $2, $3, $4, $5)
        ON CONFLICT (user_id, problem_id) DO UPDATE
        SET
        conseq_failed_attempt = Activity.conseq_failed_attempt + 1,
        is_solved = Activity.is_solved,
        last_solve_time = $5;
        `;
        const params = [user_id,problem_id,1,false,Date.now()];
        const result = await this.query(query, params);
        return result;
    };

    updateOnSuccessfulAttempt = async (user_id,problem_id) => {
        //console.log("lets see"+problem_id);
        const query = `
        INSERT INTO Activity (user_id, problem_id, conseq_failed_attempt, is_solved, last_solve_time)
        VALUES ($1, $2, $3, $4, $5)
        ON CONFLICT (user_id, problem_id) DO UPDATE
        SET
        conseq_failed_attempt = $3,
        is_solved = $4,
        last_solve_time = $5;
        `;
        const params = [user_id,problem_id,0,true,Date.now()];
        const result = await this.query(query, params);
        return result;
    };


}
module.exports=UserActivityRepository;
