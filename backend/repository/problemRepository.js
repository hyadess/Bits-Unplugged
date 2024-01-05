const Repository = require("./base");
const SeriesRepository = require("./seriesRepository");
const seriesRepository = new SeriesRepository();
const CanvasRepository = require("./canvasRepository");
const canvasRepository = new CanvasRepository();
class ProblemsRepository extends Repository {
  constructor() {
    super();
  }
  getAllProblems = async () => {
    const query = `
    SELECT * FROM Problem;
    `;
    const params = [];
    const result = await this.query(query, params);
    return result;
  };
  getSubmittedProblems = async () => {
    const query = `
    SELECT * FROM Problem
    WHERE submit_state_id IS NOT NULL;
    `;
    const params = [];
    const result = await this.query(query, params);
    return result;
  };
  getMyProblems = async (author_id) => {
    const query = `
    SELECT P.*, C.name as canvas_name 
    FROM Problem P
    LEFT JOIN Canvas C
    ON C.canvas_id = P.canvas_id
    WHERE author_id = $1;
    `;
    const params = [author_id];
    const result = await this.query(query, params);
    console.log(result)
    return result;
  };
  getProblemsBySeries = async (series_id) => {
    const query = `
      SELECT P.*, S.name as series_name, T.name as topic_name 
      FROM Problem P
      JOIN Series S
      ON P.series_id = S.series_id
      JOIN Topic T
      ON S.topic_id = T.topic_id
      WHERE S.series_id = $1
      AND P.is_live = TRUE;
    `;
    const params = [series_id];
    const result = await this.query(query, params);
    return result;
  };
  getUnsolvedProblemsBySeries = async (user_id, series_id) => {
    const query = `
    SELECT P.*, 
    S.name AS series_name, 
    T.name AS topic_name 
    FROM Problem P
    JOIN Series S ON P.series_id = S.series_id
    JOIN Topic T ON S.topic_id = T.topic_id
    LEFT JOIN Activity U ON P.problem_id = U.problem_id AND U.user_id = $1
    WHERE (U.user_id IS NULL OR U.is_solved = FALSE)
    AND P.is_live = TRUE
    AND S.series_id = $2;
    `;
    const params = [user_id, series_id];
    const result = await this.query(query, params);
    return result;
  };

  //new for souvik....................
  getAllUnsolvedProblems = async (user_id) => {
    const query = `
    SELECT P.*, 
    S.name AS series_name, 
    T.name AS topic_name 
    FROM Problem P
    JOIN Series S ON P.series_id = S.series_id
    JOIN Topic T ON S.topic_id = T.topic_id
    LEFT JOIN Activity U ON P.problem_id = U.problem_id AND U.user_id = $1
    WHERE (U.user_id IS NULL OR U.is_solved = FALSE)
    AND P.is_live = TRUE;
    `;
    const params = [user_id];
    const result = await this.query(query, params);
    return result;
  };
  //new for souvik....................
  getAllUnsolvedAndAttemptedProblems = async (user_id) => {
    const query = `
    SELECT P.*, 
    S.name AS series_name, 
    T.name AS topic_name 
    FROM Problem P
    JOIN Series S ON P.series_id = S.series_id
    JOIN Topic T ON S.topic_id = T.topic_id
    LEFT JOIN Activity U ON P.problem_id = U.problem_id AND U.user_id = $1
    WHERE (U.user_id IS NOT NULL AND U.is_solved = FALSE)
    AND P.is_live = TRUE
    ORDER BY U.conseq_failed_attempt DESC;
    `;
    const params = [user_id];
    const result = await this.query(query, params);
    return result;
  };
  //new for souvik.........................
  getRecommendations =async (user_id)=>{
    //will change it later................................
    return await this.getAllUnsolvedAndAttemptedProblems(user_id);
  }


  getProblemsByTopic = async (topic_id) => {
    const query = `
    SELECT * 
    FROM Problem P
    JOIN Series A
    ON P.series_id = A.series_id
    WHERE A.topic_id = $1;
    `;
    const params = [topic_id];
    const result = await this.query(query, params);
    return result;
  };
  getProblemById = async (problem_id) => {
    const query = `
    SELECT P.*, S.name as series_name, T.name as topic_name, C.name as canvas_name 
    FROM Problem P
    LEFT JOIN Series S
    ON P.series_id = S.series_id
    LEFT JOIN Topic T
    ON S.topic_id = T.topic_id
    LEFT JOIN Canvas C
    ON C.canvas_id = P.canvas_id
    WHERE problem_id = $1;
    `;
    const params = [problem_id];
    const result = await this.query(query, params);
    return result;
  };

  getPublishedProblemById = async (problem_id) => {
    const query = `
    SELECT P.problem_id, St.*, S.name as series_name, T.name as topic_name 
    FROM Problem P
    LEFT JOIN Series S
    ON P.series_id = S.series_id
    LEFT JOIN Topic T
    ON S.topic_id = T.topic_id
    LEFT JOIN State St
    ON St.state_id = P.submit_state_id
    WHERE problem_id = $1 AND is_live = true;
    `;
    const params = [problem_id];
    const result = await this.query(query, params);
    return result;
  };
  deleteProblem = async (problem_id) => {
    const query = `
    DELETE FROM Problem
    WHERE problem_id = $1;
    `;
    const params = [problem_id];
    const result = await this.query(query, params);
    return result;
  };
  submitProblem = async (problem_id) => {
    const result1 = await this.getProblemById(problem_id);
    if (result1.success) {
      const prob = result1.data[0];
      if (prob.submit_state_id !== null) {
        const query = `
          Update State
          SET title = $2, statement = $3, canvas_data = $4, checker_code = $5, params = $6, ui_params = $7, control_params = $8, last_updated = $9, canvas_id = $10, checker_type = $11, checker_canvas = $12
          WHERE state_id = $1;
        `;
        const params = [
          prob.submit_state_id,
          prob.title,
          prob.statement,
          prob.canvas_data,
          prob.checker_code,
          prob.params,
          prob.ui_params,
          prob.control_params,
          Date.now(),
          prob.canvas_id,
          prob.checker_type,
          prob.checker_canvas,
        ];
        const result2 = await this.query(query, params);
        if (result2.success) {
          const query = `
          Update Problem
          SET is_live = $2
          WHERE problem_id = $1;
        `;
          const params = [problem_id, false];
          const result3 = await this.query(query, params);
          return result3;
        }
      } else {
        const query = `
          INSERT INTO State (title, statement, canvas_data, ${
            prob.checker_type == 0 ? "checker_code" : "checker_canvas"
          }, params, ui_params, control_params, last_updated, canvas_id, checker_type)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
          RETURNING state_id;
        `;
        const params = [
          prob.title,
          prob.statement,
          prob.canvas_data,
          prob.solution_checker,
          prob.params,
          prob.ui_params,
          prob.control_params,
          Date.now(),
          prob.canvas_id,
          prob.checker_type,
        ];
        const result2 = await this.query(query, params);
        if (result2.success) {
          const query = `
          Update Problem
          SET submit_state_id = $2, is_live = $3
          WHERE problem_id = $1;
        `;
          const params = [problem_id, result2.data[0].state_id, false];
          const result3 = await this.query(query, params);
          return result3;
        }
      }
    }
  };
  publishProblem = async (problem_id) => {
    const query = `
    Update Problem
    SET is_live = TRUE
    WHERE problem_id = $1;
    `;
    const params = [problem_id];
    const result = await this.query(query, params);
    return result;
  };
  unpublishProblem = async (problem_id) => {
    const query = `
    Update Problem
    SET is_live = FALSE
    WHERE problem_id = $1;
    `;
    const params = [problem_id];
    const result = await this.query(query, params);
    return result;
  };
  updateTitle = async (problem_id, title) => {
    const query = `
    Update Problem
    SET title = $2, last_updated = $3
    WHERE problem_id = $1;
    `;
    const params = [problem_id, title, Date.now()];
    const result = await this.query(query, params);
    return result;
  };
  updateStatement = async (problem_id, statement) => {
    const query = `
    Update Problem
    SET statement = $2, last_updated = $3
    WHERE problem_id = $1;
    `;
    const params = [problem_id, statement, Date.now()];
    const result = await this.query(query, params);
    return result;
  };
  updateCanvas = async (
    problem_id,
    canvas_id,
    canvas_data,
    design_params,
    ui_params,
    control_params
  ) => {
    console.log("=>", canvas_data);
    const query = `
    Update Problem
    SET canvas_id = $2, canvas_data = $3, params = $4, ui_params = $5, control_params = $6, last_updated = $7
    WHERE problem_id = $1;
    `;
    const params = [
      problem_id,
      canvas_id,
      canvas_data,
      design_params,
      ui_params,
      control_params,
      Date.now()
    ];
    const result = await this.query(query, params);
    return result;
  };
  updateSeries = async (problem_id, series_id) => {
    const query = `
    Update Problem
    SET series_id = $2
    WHERE problem_id = $1;
    `;
    const params = [problem_id, series_id];
    const result = await this.query(query, params);
    return result;
  };
  updateSerial = async (problem_id, serial_no) => {
    const query = `
    Update Problem
    SET serial_no = $2
    WHERE problem_id = $1;
    `;
    const params = [problem_id, serial_no];
    const result = await this.query(query, params);
    return result;
  };
  updateSolutionChecker = async (
    problem_id,
    solution_checker,
    checker_type
  ) => {
    const query = `
    Update Problem
    SET ${
      checker_type == 0 ? "checker_code" : "checker_canvas"
    } = $2, checker_type = $3, last_updated = $4
    WHERE problem_id = $1;
    `;
    const params = [problem_id, solution_checker, checker_type, Date.now()];
    const result = await this.query(query, params);
    return result;
  };
  addProblem = async (author_id, data) => {
    // Assign series template to this problem
    // console.log(data);
    // const res = await canvasRepository.getCanvasById(data.series_id);
    const query = `
      INSERT INTO Problem (author_id, title, last_updated)
      VALUES ($1, $2, $3)
      RETURNING problem_id;
      `;
    const params = [author_id, data.title, Date.now()];
    const result = await this.query(query, params);
    return result;
  };
}

module.exports = ProblemsRepository;
