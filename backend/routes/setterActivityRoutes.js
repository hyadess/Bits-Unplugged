const router = require("express").Router();
const authMiddleware = require("../services/tokenValidationService");
const SetterActivityController = require("../controllers/setterActivityController");
const setterActivityController = new SetterActivityController();
const passport = require("passport");
router.use(
  passport.authenticate("jwt", { failureRedirect: "/invalid", session: false })
);


router.get("/:setterId/series", setterActivityController.setterActivityBySeries);
router.get("/:setterId/famousProblem", setterActivityController.famousProblemBySetter);
router.get("/:setterId/approvalStatus", setterActivityController.approvalStatusStat);


module.exports = router;