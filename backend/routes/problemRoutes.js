const router = require("express").Router();
const authMiddleware = require("../services/tokenValidationService");
const ProblemController = require("../controllers/problemController");
const problemController = new ProblemController();
const passport = require("passport");
router.use(
  passport.authenticate("jwt", { failureRedirect: "/invalid", session: false })
);
// All
router.get("/", problemController.getAllProblems);
router.get("/submitted", problemController.getSubmittedProblems);
router.get("/by_series/:seriesId", problemController.getProblemsBySeries);
router.get(
  "/by_series/unsolved/:seriesId",
  problemController.getUnsolvedProblemsBySeries
);

router.get("/unsolved", problemController.getAllUnsolvedProblems); //new for souvik
router.get(
  "/unsolved/attempted",
  problemController.getAllUnsolvedAndAttemptedProblems
); //new for souvik..
router.get("/recommendation", problemController.getRecommendations); // new for souvik.....

router.get("/by_topic/:topicId", problemController.getProblemsByTopic);
// router.post("/:problemId/rate", problemController.rateProblem); // later

// Problem Setter
router.post("/", problemController.createProblem);
router.put("/:id", problemController.updateProblem);
router.get("/created", problemController.getMyProblems);
router.get("/:problemId", problemController.getProblemById);
router.delete("/:id", problemController.deleteProblem);

router.put("/:problemId/title", problemController.updateTitle);
router.put("/:problemId/series", problemController.updateSeries);
router.put("/:problemId/serial", problemController.updateSerial);
router.put("/:problemId/canvas", problemController.updateCanvas);
// router.put("/:problemId/hints", problemController.updateHints); // later
router.put("/:problemId/statement", problemController.updateStatement);
router.put(
  "/:problemId/solutionChecker",
  problemController.updateSolutionChecker
);

router.post("/:problemId/submit", problemController.submitProblem);
router.post("/:problemId/publish", problemController.publishProblem);
router.post("/:problemId/unpublish", problemController.unpublishProblem);

router.post("/:problemId/bookmark", (req, res) => res.status(200).send()); // dihan - Bookmark a problem
router.put("/rating", (req, res) => res.status(200).send()); // dihan - Bookmark a problem
module.exports = router;
