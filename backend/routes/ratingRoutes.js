const router = require("express").Router();
const authMiddleware = require("../services/tokenValidationService");


const RatingController = require("../controllers/ratingController");
const ratingController = new RatingController();


const passport = require("passport");
router.use(
  passport.authenticate("jwt", { failureRedirect: "/invalid", session: false })
);

// router.get("/latestProblems", ratingController.getLatestProblemsWithRatings);
// router.get(
//   "/userRatingsAndAttempts/:problemId",
//   ratingController.getUserRatingsAndAttemptsByProblem
// );

router.get("/:userId/current", ratingController.getCurrentRating);
router.get("/:userId/history", ratingController.getRatingHistory);



router.post("/updateAllproblemRating", ratingController.updateAllproblemRating);
router.post("/updateAllUserRating/:contestId", ratingController.changeUserRatings);
router.get("/showAll", ratingController.showAllUserRatings);

module.exports = router;