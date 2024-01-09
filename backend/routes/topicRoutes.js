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
router.get("/:topicId", topicController.getTopicById); // fetch
router.put("/:topicId", topicController.updateTopic); // edit
router.put("/:topicId/live", (req,res)=>res.status(204).json()); // edit
router.delete("/:topicId", topicController.deleteTopic); // delete
router.get("/invalid", () => {
  console.log("Failed");
}); // delete

module.exports = router;
