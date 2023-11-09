const Repository = require("./base");
const AlgoRepository = require("../repository/algoRepository");
const algoRepository = new AlgoRepository();
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
  getProblemsByAlgo = async (algo_id) => {
    const query = `
    SELECT * FROM Problem
    WHERE algo_id = $1
    AND is_live = TRUE;
    `;
    const params = [algo_id];
    const result = await this.query(query, params);
    return result;
  };
  getProblemsByTopic = async (topic_id) => {
    const query = `
    SELECT * 
    FROM Problem P
    JOIN Algorithm A
    ON P.algo_id = A.algo_id
    WHERE A.topic_id = $1;
    `;
    const params = [topic_id];
    const result = await this.query(query, params);
    return result;
  };
  getProblemById = async (problem_id) => {
    const query = `
    SELECT P.*, A.canvas_id 
    FROM Problem P
    JOIN Algorithm A
    ON P.algo_id = A.algo_id
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
    // Assign algo template to this problem
    // console.log(data);
    const res = await algoRepository.getAlgoById(data.algo_id);
    if (res.success) {
      const query = `
      INSERT INTO Problem (author_id, algo_id, title, creation_time, solution_checker)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING problem_id;
      `;
      const params = [
        author_id,
        data.algo_id,
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
