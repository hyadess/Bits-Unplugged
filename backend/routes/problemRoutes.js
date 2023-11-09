const router = require("express").Router();
const authMiddleware = require("../service/tokenValidationService");
const ProblemController = require("../controller/problemController");
const problemController = new ProblemController();

router.use(authMiddleware);

// All
router.get("/", problemController.getAllProblems); // pending
router.get("/by_algo/:algo_id", problemController.getProblemsByAlgo);
router.get("/by_topic/:topic_id", problemController.getProblemsByTopic);
// router.post("/:problem_id/rate", problemController.rateProblem); // later

// Problem Setter
router.post("/", problemController.addProblem); // pending
router.get("/created", problemController.getMyProblems); // pending
router.get("/:problem_id", problemController.getProblemById); // pending
router.delete("/:problem_id", problemController.deleteProblem); // pending

router.put("/:problem_id/title", problemController.updateTitle); // pending
router.put("/:problem_id/canvas", problemController.updateCanvas); // pending
// router.put("/:problem_id/hints", problemController.updateHints); // later
router.put("/:problem_id/statement", problemController.updateStatement); // pending
router.put(
  "/:problem_id/solution_checker",
  problemController.updateSolutionChecker
); // pending

router.post("/:problem_id/publish", problemController.publishProblem); // pending

module.exports = router;
