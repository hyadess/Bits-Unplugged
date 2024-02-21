const router = require("express").Router();
const authMiddleware = require("../services/tokenValidationService");
const UserActivityController = require("../controllers/userActivityController");
const userActivityController = new UserActivityController();
const DailyActivityController = require("../controllers/dailyActivityController");
const dailyActivityController = new DailyActivityController();
const passport = require("passport");
router.use(
  passport.authenticate("jwt", { failureRedirect: "/invalid", session: false })
);
router.post(
  "/:problemId/successAttempt",
  userActivityController.updateOnSuccessfulAttempt
);
router.post(
  "/:problemId/failedAttempt",
  userActivityController.updateOnFailedAttempt
);

router.get("/stat/seriesFails", userActivityController.totalFailedAttempts);
router.get(
  "/stat/seriesSuccesses",
  userActivityController.totalSuccessfulAttempts
);

router.get(
  "/stat/:seriesId/fails",
  userActivityController.totalFailedAttemptsBySeries
);
router.get(
  "/stat/:seriesId/successes",
  userActivityController.totalSuccessfulAttemptsBySeries
);

router.get("/stat/fails/me", userActivityController.totalFailedAttemptsByUser);



router.get("/stat/:username/recentfails/user", userActivityController.mostRecentFailsByUser);
router.get(
  "/stat/:username/successes/user",
  userActivityController.successesByUser
);

router.get(
  "/stat/successes/:problemId",
  userActivityController.successesByProblem
);
router.get(
  "/stat/series/successes/me",
  userActivityController.totalSolvedProblemsByUser
);
router.get("/:problemId/acceptance", userActivityController.acceptanceByProblem);
router.get(
  "/stat/:topicId/problems",
  userActivityController.totalProblemCountByTopic
);
router.get(
  "/stat/:topicId/solvedProblems",
  userActivityController.totalSolvedProblemCountByTopic
);
router.get(
  "/stat/:username/activetime",
  dailyActivityController.daywiseActivityByUser
);
router.put("/:problemId/track-duration", userActivityController.trackDuration);



///on daily activity


router.get(
  "/stat/recentViews",
  dailyActivityController.recentlyViewedProblems
);


module.exports = router;
