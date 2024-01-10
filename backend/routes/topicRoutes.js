const router = require("express").Router();


const TopicController = require("../controllers/topicController");
const passport = require("passport");
const topicController = new TopicController();

// router.use(authMiddleware);
router.use(
  passport.authenticate("jwt", { failureRedirect: "/invalid", session: false })
);

router.get("/", topicController.getAllTopics);
router.get("/live", topicController.getAllTopics); // pending
router.post("/", topicController.createTopic); // add_new
router.get("/:id", topicController.getTopicById); // fetch
router.put("/:id", topicController.updateTopic); // edit
router.put("/:id/live", (req,res)=>res.status(204).json()); // edit
router.delete("/:id", topicController.deleteTopic); // delete
router.get("/invalid", () => {
  console.log("Failed");
}); // delete

module.exports = router;
