const router = require("express").Router();
const authMiddleware = require("../services/tokenValidationService");
const handleRequestMiddleware = require("../middlewares/errorHandlingMiddleware");
const SeriesController = require("../controllers/seriesController");
const seriesController = new SeriesController();
const passport = require("passport");
router.use(
  passport.authenticate("jwt", { failureRedirect: "/invalid", session: false })
);
router.get("/by_topic/:topicId", seriesController.getSeriesByTopic);

router.get("/", seriesController.getAllSeries);
router.get("/live", seriesController.getAllSeries); // pending
router.post("/", seriesController.createSeries);

router.get("/:id", seriesController.getSeriesById);
router.put("/:id", seriesController.updateSeries);
router.put("/:id/live", (req, res) => res.status(204).json()); // edit
router.delete("/:id", seriesController.deleteSeries);
router.get("/:id/problems", seriesController.getAllProblems);
module.exports = router;
