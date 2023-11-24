const router = require("express").Router();
const authRoutes = require("./authRoutes");
const problemRoutes = require("./problemRoutes");
const topicRoutes = require("./topicRoutes");
const seriesRoutes = require("./seriesRoutes");
const canvasRoutes = require("./canvasRoutes");
const profileRoutes = require("./profileRoutes");
const base = require("../repository/base");
router.get("/", async (req, res) => {
  const result = await new base().check();
  if (result.success) {
    res.status(200).send("Hi, welcome to Bits Unplugged");
  } else {
    res.status(404).send("Cannot connect to Database");
  }
});

router.use("/auth", authRoutes);
router.use("/topic", topicRoutes);
router.use("/series", seriesRoutes);
router.use("/problem", problemRoutes);
router.use("/canvas", canvasRoutes);
router.use("/profile", profileRoutes);

module.exports = router;
