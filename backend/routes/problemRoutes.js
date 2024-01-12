const router = require("express").Router();
const authMiddleware = require("../services/tokenValidationService");
const ProblemController = require("../controllers/problemController");
const problemController = new ProblemController();
const passport = require("passport");
router.use(
  passport.authenticate("jwt", { failureRedirect: "/invalid", session: false })
);
// All
router.get("/", problemController.getAllProblems); // api/problems/
router.get("/submitted", problemController.getSubmittedProblems); // api/problems?submitted=true
router.get("/by_series/:seriesId", problemController.getProblemsBySeries); // api/problems?seriesId=45
// handle both for admin and user
router.get(
  "/by_series/unsolved/:seriesId",
  problemController.getUnsolvedProblemsBySeries // api/problems?solved=false&seriesId=45
);

router.get("/unsolved", problemController.getAllUnsolvedProblems); // api/problems?solved=false
router.get(
  "/unsolved/attempted",
  problemController.getAllUnsolvedAndAttemptedProblems
); // api/problems?solved=false
router.get("/recommendation", problemController.getRecommendations); // api/problems?recommended=true

router.get("/by_topic/:topicId", problemController.getProblemsByTopic); // api/problems?topicId=true
// router.post("/:problemId/rate", problemController.rateProblem); // later

// Problem Setter
router.post("/", problemController.createProblem);
router.put("/:id", problemController.updateProblem);
router.get("/created", problemController.getMyProblems); // api/problems/my
router.get("/:problemId", problemController.getProblemById); // api/problems?problemId=true
router.delete("/:id", problemController.deleteProblem); // api/problems

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
