const router = require("express").Router();
const authMiddleware = require("../service/tokenValidationService");
const UserActivityController = require("../controller/userActivityController");
const userActivityController = new UserActivityController();

router.use(authMiddleware);

router.post("/:problem_id/successAttempt", userActivityController.updateOnSuccessfulAttempt); 
router.post("/:problem_id/failedAttempt", userActivityController.updateOnFailedAttempt);

router.get("/stat/seriesFails",userActivityController.totalFailedAttempts);
router.get("/stat/seriesSuccesses",userActivityController.totalSuccessfulAttempts);

router.get("/stat/:series_id/fails",userActivityController.totalFailedAttemptsBySeries);
router.get("/stat/:series_id/successes",userActivityController.totalSuccessfulAttemptsBySeries);

router.get("/stat/fails/me",userActivityController.totalFailedAttemptsByUser);
router.get("/stat/successes/me",userActivityController.totalSolvedProblemsByUser);

module.exports = router;