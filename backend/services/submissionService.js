const Service = require("./base");
const SubmissionRepository = require("../repositories/submissionRepository");
const ProblemRepository = require("../repositories/problemRepository");
const UserActivityRepository = require("../repositories/userActivityRepository");
const userActivityRepository = new UserActivityRepository();
const submissionRepository = new SubmissionRepository();
const problemRepository = new ProblemRepository();
class SubmissionService extends Service {
  constructor() {
    super();
  }

  submitSolution = async (userId, problemId, submission) => {
    try {
      await userActivityRepository.trackDuration(
        userId,
        problemId,
        submission.duration
      );

      if (submission.verdict === "Accepted") {
        await userActivityRepository.updateOnSuccessfulAttempt(
          userId,
          problemId
        );
      } else if (submission.verdict === "Wrong answer") {
        await userActivityRepository.updateOnFailedAttempt(userId, problemId);
      }
      await submissionRepository.submitSolution({
        ...submission,
        problemId,
        userId,
      });
      return { success: true };
    } catch (err) {
      console.log(err);
      return { success: false };
    }
  };
}

module.exports = new SubmissionService();
