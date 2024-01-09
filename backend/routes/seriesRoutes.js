const router = require("express").Router();
const authMiddleware = require("../service/tokenValidationService");
const SeriesController = require("../controller/seriesController");
const seriesController = new SeriesController();
const passport = require("passport");
router.use(
  passport.authenticate("jwt", { failureRedirect: "/invalid", session: false })
);
router.get("/by_topic/:topicId", seriesController.getSeriesByTopic);

router.get("/", seriesController.getAllSeries);
router.get("/live", seriesController.getAllSeries); // pending
router.post("/", seriesController.addSeries);

router.get("/:seriesId", seriesController.getSeriesById);
router.put("/:seriesId", seriesController.updateSeries);
router.delete("/:seriesId", seriesController.deleteSeries);
router.get("/:seriesId/problems", seriesController.getAllProblems);
module.exports = router;
