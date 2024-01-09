const router = require("express").Router();
const authMiddleware = require("../service/tokenValidationService");
const SubmissionController = require("../controller/submissionController");
const submissionController = new SubmissionController();

const passport = require("passport");
router.use(
  passport.authenticate("jwt", { failureRedirect: "/invalid", session: false })
);
router.get(
  "/:problemId",
  submissionController.getAllSubmissionsByUserAndProblem
);
router.get(
  "/:problemId/allUsers",
  submissionController.getAllSubmissionsByProblem
);
router.get("/", submissionController.getAllSubmissionsByUser);
router.post("/:problemId/saveSubmit", submissionController.submitSolution);
module.exports = router;
