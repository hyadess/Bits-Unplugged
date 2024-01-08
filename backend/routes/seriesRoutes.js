const router = require("express").Router();
const authMiddleware = require("../service/tokenValidationService");
const SeriesController = require("../controller/seriesController");
const seriesController = new SeriesController();
const passport = require("passport");
router.use(
  passport.authenticate("jwt", { failureRedirect: "/invalid", session: false })
);
router.get("/by_topic/:topic_id", seriesController.getSeriesByTopic);

router.get("/", seriesController.getAllSeries);
router.get("/live", seriesController.getAllSeries); // pending
router.post("/", seriesController.addSeries);

router.get("/:series_id", seriesController.getSeriesById);
router.put("/:series_id", seriesController.updateSeries);
router.delete("/:series_id", seriesController.deleteSeries);
router.get("/:series_id/problems", seriesController.getAllProblems);
module.exports = router;
