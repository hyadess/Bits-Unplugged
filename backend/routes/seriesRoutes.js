const router = require("express").Router();
const authMiddleware = require("../service/tokenValidationService");
const SeriesController = require("../controller/seriesController");
const seriesController = new SeriesController();

router.use(authMiddleware);

router.get("/by_topic/:topic_id", seriesController.getSeriessByTopic);

router.get("/", seriesController.getAllSeriess);
router.post("/", seriesController.addSeries);

router.get("/:series_id", seriesController.getSeriesById);
router.put("/:series_id", seriesController.updateSeries);
router.delete("/:series_id", seriesController.deleteSeries);

module.exports = router;
