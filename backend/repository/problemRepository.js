const Repository = require("./base");
const SeriesRepository = require("./seriesRepository");
const seriesRepository = new SeriesRepository();
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
  getMyProblems = async (author_id) => {
    const query = `
    SELECT * FROM Problem
    WHERE author_id = $1;
    `;
    const params = [author_id];
    const result = await this.query(query, params);
    return result;
  };
  getProblemsBySeries = async (series_id) => {
    const query = `
    SELECT * FROM Problem
    WHERE series_id = $1
    AND is_live = TRUE;
    `;
    const params = [series_id];
    const result = await this.query(query, params);
    return result;
  };
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
    SELECT P.*, S.canvas_id, S.name as series_name, T.name as topic_name 
    FROM Problem P
    JOIN Series S
    ON P.series_id = S.series_id
    JOIN Topic T
    ON S.topic_id = T.topic_id
    WHERE problem_id = $1;
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
    SET title = $2
    WHERE problem_id = $1;
    `;
    const params = [problem_id, title];
    const result = await this.query(query, params);
    return result;
  };
  updateStatement = async (problem_id, statement) => {
    const query = `
    Update Problem
    SET statement = $2
    WHERE problem_id = $1;
    `;
    const params = [problem_id, statement];
    const result = await this.query(query, params);
    return result;
  };
  updateCanvas = async (problem_id, canvas_data) => {
    const query = `
    Update Problem
    SET canvas_data = $2
    WHERE problem_id = $1;
    `;
    const params = [problem_id, canvas_data];
    const result = await this.query(query, params);
    return result;
  };
  updataSolutionChecker = async (problem_id, code) => {
    const query = `
    Update Problem
    SET solution_checker = $2
    WHERE problem_id = $1;
    `;
    const params = [problem_id, code];
    const result = await this.query(query, params);
    return result;
  };
  addProblem = async (author_id, data) => {
    // Assign series template to this problem
    // console.log(data);
    const res = await seriesRepository.getSeriesById(data.series_id);
    if (res.success) {
      const query = `
      INSERT INTO Problem (author_id, series_id, title, creation_time, solution_checker)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING problem_id;
      `;
      const params = [
        author_id,
        data.series_id,
        "Untitled",
        Date.now(),
        res.data[0].template,
      ];
      const result = await this.query(query, params);
      return result;
    }
    return res;
  };
}

module.exports = ProblemsRepository;
