const router = require("express").Router();
const authMiddleware = require("../service/tokenValidationService");
const ProblemController = require("../controller/problemController");
const problemController = new ProblemController();

router.use(authMiddleware);

// All
router.get("/", problemController.getAllProblems);
router.get("/submitted", problemController.getSubmittedProblems);
router.get("/by_series/:series_id", problemController.getProblemsBySeries);
router.get("/by_series/unsolved/:series_id", problemController.getUnsolvedProblemsBySeries);

router.get("/unsolved",problemController.getAllUnsolvedProblems); //new for souvik
router.get("/unsolved/attempted",problemController.getAllUnsolvedAndAttemptedProblems); //new for souvik..
router.get("/recommendation",problemController.getRecommendations) // new for souvik.....

router.get("/by_topic/:topic_id", problemController.getProblemsByTopic);
// router.post("/:problem_id/rate", problemController.rateProblem); // later

// Problem Setter
router.post("/", problemController.addProblem);
router.get("/created", problemController.getMyProblems);
router.get("/:problem_id", problemController.getProblemById);
router.delete("/:problem_id", problemController.deleteProblem);

router.put("/:problem_id/title", problemController.updateTitle);
router.put("/:problem_id/series", problemController.updateSeries); 
router.put("/:problem_id/serial", problemController.updateSerial); 
router.put("/:problem_id/canvas", problemController.updateCanvas);
// router.put("/:problem_id/hints", problemController.updateHints); // later
router.put("/:problem_id/statement", problemController.updateStatement);
router.put(
  "/:problem_id/solution_checker",
  problemController.updateSolutionChecker
);

router.post("/:problem_id/submit", problemController.submitProblem);
router.post("/:problem_id/publish", problemController.publishProblem);
router.post("/:problem_id/unpublish", problemController.unpublishProblem);
module.exports = router;
 