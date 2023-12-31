const router = require("express").Router();
const authMiddleware = require("../service/tokenValidationService");
const UserActivityController = require("../controller/userActivityController");
const userActivityController = new UserActivityController();

router.use(authMiddleware);

router.post("/:problem_id/successAttempt", userActivityController.updateOnSuccessfulAttempt); 
router.post("/:problem_id/failedAttempt", userActivityController.updateOnFailedAttempt);
module.exports = router;