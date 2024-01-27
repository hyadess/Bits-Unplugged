const router = require("express").Router();
const { requiresAdmin } = require("../middlewares/authMiddleware");

const TopicController = require("../controllers/topicController");
const passport = require("passport");
const topicController = new TopicController();

// router.use(authMiddleware);
router.use(
  passport.authenticate("jwt", { failureRedirect: "/invalid", session: false })
);

router.get("/", topicController.getAllTopics);
router.post("/", requiresAdmin, topicController.createTopic); // add_new
router.get("/:id", topicController.getTopicById); // fetch
router.put("/serial", requiresAdmin, topicController.updateTopicSerial); // edit
router.put("/:id", requiresAdmin, topicController.updateTopic); // edit
router.put("/", requiresAdmin, topicController.updateTopics); // edit
router.delete("/:id", requiresAdmin, topicController.deleteTopic); // delete
// router.get("/live", topicController.getAllTopics); // pending
// router.put("/:id/live", (req, res) => res.status(204).json()); // edit

module.exports = router;
