const Repository = require("./base");
class UserActivityRepository extends Repository{
    constructor() {
        super();
    }

    updateOnFailedAttempt = async (user_id,problem_id) => {
        console.log("lets see"+problem_id);
        const query = `
        INSERT INTO Activity (user_id, problem_id, conseq_failed_attempt, is_solved, last_solve_timestamp, last_successful_solve_timestamp, total_failed_attempt)
        VALUES ($1, $2, $3, $4, $5, NULL, $6)
        ON CONFLICT (user_id, problem_id) DO UPDATE
        SET
        conseq_failed_attempt = Activity.conseq_failed_attempt + 1,
        is_solved = Activity.is_solved,
        total_failed_attempt=Activity.total_failed_attempt + 1,
        last_solve_timestamp = $5;
        `;
        const params = [user_id,problem_id,1,false,Date.now(),1];
        const result = await this.query(query, params);
        return result;
    };

    updateOnSuccessfulAttempt = async (user_id,problem_id) => {
        //console.log("lets see"+problem_id);
        const query = `
        INSERT INTO Activity (user_id, problem_id, conseq_failed_attempt, is_solved, last_solve_timestamp, last_successful_solve_timestamp, total_failed_attempt)
        VALUES ($1, $2, $3, $4, $5, $5, $6)
        ON CONFLICT (user_id, problem_id) DO UPDATE
        SET
        conseq_failed_attempt = $3,
        is_solved = $4,
        last_successful_solve_timestamp = $5,
        last_solve_timestamp = $5;
        `;
        const params = [user_id,problem_id,0,true,Date.now(),0];
        const result = await this.query(query, params);
        return result;
    };

    //new ones...

    totalSuccessfulAttempts= async () =>{
        const query = `
        SELECT
        S.series_id,
        S.name,
        SUM(CASE WHEN A.is_solved THEN 1 ELSE 0 END) AS total_successful_attempts_per_series
        FROM
        Series S
        JOIN
        Problem P ON S.series_id = P.series_id
        JOIN
        Activity A ON P.problem_id = A.problem_id
        GROUP BY
        S.series_id;
        `;
        const params = [];
        const result = await this.query(query, params);
        return result;
    };

    totalFailedAttempts = async () =>{
        const query = `
        SELECT
        S.series_id,
        S.name,
        SUM(A.total_failed_attempt) AS total_failed_attempts_per_series
        FROM
        Series S
        JOIN
        Problem P ON S.series_id = P.series_id
        JOIN
        Activity A ON P.problem_id = A.problem_id
        GROUP BY
        S.series_id;
        `;
        const params = [];
        const result = await this.query(query, params);
        return result;
    };

    totalSolvedProblemsByUser = async (user_id) =>{
        const query = `
        SELECT
        S.series_id,
        S.name,
        SUM(CASE WHEN A.is_solved THEN 1 ELSE 0 END) AS total_successful_attempts_per_series
        FROM
        Series S
        JOIN
        Problem P ON S.series_id = P.series_id
        JOIN
        Activity A ON P.problem_id = A.problem_id
        WHERE A.user_id=$1
        GROUP BY
        S.series_id;
        `;
        const params = [user_id];
        const result = await this.query(query, params);
        return result;
    };

    totalFailedAttemptsByUser = async (user_id) =>{
        const query = `
        SELECT
        S.series_id,
        S.name,
        SUM(A.total_failed_attempt) AS total_failed_attempts_per_series
        FROM
        Series S
        JOIN
        Problem P ON S.series_id = P.series_id
        JOIN
        Activity A ON P.problem_id = A.problem_id
        WHERE A.user_id=$1
        GROUP BY
        S.series_id;
        `;
        const params = [user_id];
        const result = await this.query(query, params);
        return result;
    };

    totalSuccessfulAttemptsBySeries = async (series_id) =>{
        const query = `
        SELECT
        S.series_id,
        S.name,
        SUM(CASE WHEN A.is_solved THEN 1 ELSE 0 END) AS total_successful_attempts_per_series
        FROM
        Series S
        JOIN
        Problem P ON S.series_id = P.series_id
        JOIN
        Activity A ON P.problem_id = A.problem_id
        WHERE S.series_id=$1
        GROUP BY
        S.series_id;
        `;
        const params = [series_id];
        const result = await this.query(query, params);
        return result;
    };

    totalFailedAttemptsBySeries = async (series_id) =>{
        const query = `
        SELECT
        S.series_id,
        S.name,
        SUM(A.total_failed_attempt) AS total_failed_attempts_per_series
        FROM
        Series S
        JOIN
        Problem P ON S.series_id = P.series_id
        JOIN
        Activity A ON P.problem_id = A.problem_id
        WHERE S.series_id=$1
        GROUP BY
        S.series_id;
        `;
        const params = [series_id];
        const result = await this.query(query, params);
        return result;
    };













    
}
module.exports=UserActivityRepository;
