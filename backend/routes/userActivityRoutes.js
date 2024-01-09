const router = require("express").Router();
const authMiddleware = require("../service/tokenValidationService");
const UserActivityController = require("../controller/userActivityController");
const userActivityController = new UserActivityController();
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
router.get(
  "/stat/successes/me",
  userActivityController.totalSolvedProblemsByUser
);

module.exports = router;
