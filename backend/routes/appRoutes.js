const router = require("express").Router();
const authRoutes = require("./authRoutes");
const problemRoutes = require("./problemRoutes");
const topicRoutes = require("./topicRoutes");
const seriesRoutes = require("./seriesRoutes");
const canvasRoutes = require("./canvasRoutes");
const profileRoutes = require("./profileRoutes");
const submissionRoutes = require("./submissionRoutes");
const userActivityRoutes = require("./userActivityRoutes");
const contestRoutes = require("./contestRoutes");
const articleRoutes = require("./articleRoutes");
const seedRoutes = require("./seedRoutes");
const setterActivityRoutes = require("./setterActivityRoutes");
const storageRoutes = require("./storageRoutes");
const ratingRoutes = require("./ratingRoutes");
const recommendationRoutes = require("./recommendationRoutes");
const base = require("../repositories/base");

require("../services/passport");

router.get("/", async (req, res) => {
  const result = await new base().check();
  if (result.success) {
    res.status(200).send("Hi, welcome to Bits Unplugged");
  } else {
    res.status(404).send("Cannot connect to Database");
  }
});

router.use("/auth", authRoutes);
router.use("/topics", topicRoutes);
router.use("/series", seriesRoutes);
router.use("/problems", problemRoutes);
router.use("/canvases", canvasRoutes);
router.use("/profile", profileRoutes);
router.use("/submissions", submissionRoutes);
router.use("/userActivity", userActivityRoutes);
router.use("/contests", contestRoutes);
router.use("/articles", articleRoutes);
router.use("/seed", seedRoutes);
router.use("/setterActivity", setterActivityRoutes);
router.use("/storage", storageRoutes);
router.use("/ratings", ratingRoutes);
router.use("/recommendations", recommendationRoutes);


module.exports = router;
