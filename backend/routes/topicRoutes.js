const router = require("express").Router();
const authMiddleware = require("../service/tokenValidationService");
const TopicController = require("../controller/topicController");
const passport = require("passport");
const topicController = new TopicController();

// router.use(authMiddleware);
router.use(
  passport.authenticate("jwt", { failureRedirect: "/invalid", session: false })
);
router.get("/", topicController.getAllTopics);
router.get("/live", topicController.getAllTopics); // pending
router.post("/", topicController.addTopic); // add_new
router.get("/:topic_id", topicController.getTopicById); // fetch
router.put("/:topic_id", topicController.updateTopic); // edit
router.put("/:topic_id/live", (req,res)=>res.status(204).json()); // edit
router.delete("/:topic_id", topicController.deleteTopic); // delete
router.get("/invalid", () => {
  console.log("Failed");
}); // delete

module.exports = router;
