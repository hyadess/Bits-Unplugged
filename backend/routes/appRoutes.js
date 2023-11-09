const router = require("express").Router();
const authRoutes = require("./authRoutes");
const problemRoutes = require("./problemRoutes");
const topicRoutes = require("./topicRoutes");
const algoRoutes = require("./algoRoutes");
const canvasRoutes = require("./canvasRoutes");
const profileRoutes = require("./profileRoutes");

router.get("/", (req, res) => {
  res.send("Hi, welcome to Bits Unplugged");
});

router.use("/auth", authRoutes);
router.use("/topic", topicRoutes);
router.use("/algorithm", algoRoutes);
router.use("/problem", problemRoutes);
router.use("/canvas", canvasRoutes);
router.use("/profile", profileRoutes);

module.exports = router;
