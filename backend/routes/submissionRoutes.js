const router = require("express").Router();
const authMiddleware = require("../services/tokenValidationService");
const SubmissionController = require("../controllers/submissionController");
const submissionController = new SubmissionController();

const passport = require("passport");
router.use(
  passport.authenticate("jwt", { failureRedirect: "/invalid", session: false })
);
router.get("/:submissionId", submissionController.getSubmissionById);
// router.get(
//   "/:problemId",
//   submissionController.getAllSubmissionsByUserAndProblem
// );
router.get(
  "/:problemId/allUsers",
  submissionController.getAllSubmissionsByProblem
);
router.get("/:username/all", submissionController.getAllSubmissionsForUser);
router.post("/:problemId/saveSubmit", submissionController.submitSolution);

module.exports = router;
