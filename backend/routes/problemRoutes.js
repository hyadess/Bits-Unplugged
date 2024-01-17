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

router.get("/unsolved", problemController.getAllUnsolvedProblems); // api/problems?solved=false
router.get(
  "/unsolved/attempted",
  problemController.getAllUnsolvedAndAttemptedProblems
); // api/problems?solved=false
router.get("/recommendation", problemController.getRecommendations); // api/problems?recommended=true


// Problem Setter
router.post("/", problemController.createProblem);
router.put("/:id", problemController.updateProblem);

router.get("/:id", problemController.getProblemById); // api/problems?problemId=true
router.delete("/:id", problemController.deleteProblem); // api/problems

router.put("/:problemId/series", problemController.updateSeries);
router.put("/:problemId/serial", problemController.updateSerial);


router.post("/:problemId/submit", problemController.submitProblem);
router.post("/:problemId/publish", problemController.publishProblem);
router.post("/:problemId/unpublish", problemController.unpublishProblem);

router.post("/:problemId/bookmark", (req, res) => res.status(200).send()); // dihan - Bookmark a problem
router.put("/rating", (req, res) => res.status(200).send()); // dihan - Bookmark a problem

module.exports = router;
