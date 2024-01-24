const Repository = require("./base");
const db = require("../models/index");

class SubmissionRepository extends Repository {
  constructor() {
    super();
  }

  getAllSubmissionsByUserAndProblem = async (userId, problemId) => {
    const result = await db.ProblemVersion.findOne({
      include: [
        {
          model: db.Submission,
          as: "submissions",
          required: false,
          where: { userId },
        },
        {
          model: db.Series,
          as: "series",
          include: [
            {
              model: db.Topic,
              as: "topic",
            },
          ],
        },
      ],
      where: {
        problemId,
      },
    });
    return result;
  };

  getAllSubmissionsByUser = async (userId) => {
    //console.log("lets see"+problemId);
    const query = `
        SELECT * 
        FROM "Submissions" S
        WHERE S."userId" = $1;
        `;
    const params = [userId];
    const result = await this.query(query, params);
    return result;
  };

  getAllSubmissionsByProblem = async (problemId) => {
    //console.log("lets see"+problemId);
    const query = `
        SELECT * 
        FROM "Submissions" S
        WHERE S."problemId" = $1;
        `;
    const params = [problemId];
    const result = await this.query(query, params);
    return result;
  };

  submitSolution = async (userId, problemId, data) => {
    return await db.Submission.create({
      verdict: data.verdict,
      problemId: problemId,
      userId: userId,
      canvasData: data.ansJson,
    });
  };
}

module.exports = SubmissionRepository;
