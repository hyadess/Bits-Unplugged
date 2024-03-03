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

router.get("/current/:userId", ratingController.getCurrentRating);
router.get("/history/:userId", ratingController.getRatingHistory);



router.post("/updateAllproblemRating", ratingController.updateAllproblemRating);
router.post("/updateAllUserRating/:contestId", ratingController.changeUserRatings);
router.get("/showAll", ratingController.showAllUserRatings);

module.exports = router;