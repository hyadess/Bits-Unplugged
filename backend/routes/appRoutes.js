const router = require("express").Router();
const authRoutes = require("./authRoutes");
const problemRoutes = require("./problemRoutes");
const topicRoutes = require("./topicRoutes");
const seriesRoutes = require("./seriesRoutes");
const canvasRoutes = require("./canvasRoutes");
const profileRoutes = require("./profileRoutes");
const submissionRoutes=require("./submissionRoutes");
const userActivityRoutes=require("./userActivityRoutes");
const contestRoutes=require("./contestRoutes")
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
router.use("/submission",submissionRoutes);
router.use("/userActivity",userActivityRoutes);
router.use("/contest",contestRoutes)

module.exports = router;
