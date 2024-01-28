const router = require("express").Router();
const authMiddleware = require("../services/tokenValidationService");
const ProblemController = require("../controllers/problemController");
const problemController = new ProblemController();
const passport = require("passport");
router.use(
  passport.authenticate("jwt", { failureRedirect: "/invalid", session: false })
);

router.get("/", problemController.getAllProblems); // api/problems/
router.post("/", problemController.createProblem);
router.put("/:id", problemController.updateProblem);
router.get("/:id", problemController.getProblemById); // api/problems?problemId=true
router.delete("/:id", problemController.deleteProblem); // api/problems
router.post("/:id/submit", problemController.submitProblem);
router.get("/:id/submissions", problemController.getSubmissions);
router.post("/:id/clone", problemController.cloneProblem);
// User - Submission of his own
// Admin - Submission of the problem

// Incomplete
// router.post("/:id/bookmark", (req, res) => res.status(200).send()); // dihan - Bookmark a problem
// router.get("/unsolved", problemController.getAllUnsolvedProblems); // api/problems?solved=false
// router.get(
//   "/unsolved/attempted",
//   problemController.getAllUnsolvedAndAttemptedProblems
// ); // api/problems?solved=false
// router.get("/recommendation", problemController.getRecommendations); // api/problems?recommended=true
// router.put("/rating", (req, res) => res.status(200).send()); // dihan - Bookmark a problem

module.exports = router;
