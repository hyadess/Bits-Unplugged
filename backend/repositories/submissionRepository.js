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
          order: [["createdAt", "DESC"]],
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
        id: problemId,
      },
      order: [
        [{ model: db.Submission, as: "submissions" }, "createdAt", "DESC"],
      ],
    });
    return result;
  };

  getAllSubmissionsByUser = async (username) => {
    console.log("lets see" + username);
    const query = `
      SELECT 
      "S".*, 
      "P"."problemId", 
      "P"."title", 
      "P"."seriesId", 
      "Ss"."name"
      FROM 
      "Submissions" "S"
      JOIN 
      "Users" "U" ON "S"."userId" = "U"."id"
      JOIN 
      "ProblemVersions" "P" ON "S"."problemId" = "P"."id"
      JOIN 
      "Series" "Ss" ON "P"."seriesId" = "Ss"."id"
      WHERE 
      "U"."username" = $1
    `;
    const params = [username];
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

  /*
  {
    verdict: data.verdict,
    problemId: problemId,
    userId: userId,
    canvasData: data.canvasData,
  }
  */
  submitSolution = async (data) => {
    const submission = await db.Submission.create(data, {
      returning: ["id"], // Specify the columns you want to return
    });
    return submission.id; // Return the newly created submission's ID
  };
}

module.exports = SubmissionRepository;
