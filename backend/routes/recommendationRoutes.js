const router = require("express").Router();
const authMiddleware = require("../services/tokenValidationService");
const RecommendationController = require("../controllers/recommendationController");
const recommendationController = new RecommendationController();
const passport = require("passport");
router.use(
  passport.authenticate("jwt", { failureRedirect: "/invalid", session: false })
);

router.get("/favoriteSeries", recommendationController.getRecommendationBySeries);
router.get("/rating", recommendationController.getRecommendationByRating);


module.exports = router;