const router = require("express").Router();
const authMiddleware = require("../service/tokenValidationService");
const SubmissionController = require("../controller/submissionController");
const submissionController = new SubmissionController();

router.use(authMiddleware);

router.get("/:problem_id", submissionController.getAllSubmissionsByUserAndProblem); 
router.get("/:problem_id/allUsers", submissionController.getAllSubmissionsByProblem);
router.get("/allProblems", submissionController.getAllSubmissionsByUser);
router.post("/:problem_id/saveSubmit",submissionController.submitSolution);
module.exports = router;