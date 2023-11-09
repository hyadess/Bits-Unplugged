const router = require("express").Router();
const authMiddleware = require("../service/tokenValidationService");
const TopicController = require("../controller/topicController");
const topicController = new TopicController();

router.use(authMiddleware);
router.get("/", topicController.getAllTopics);
router.post("/", topicController.addTopic); // add_new
router.get("/:topic_id", topicController.getTopicById); // fetch
router.put("/:topic_id", topicController.updateTopic); // edit
router.delete("/:topic_id", topicController.deleteTopic); // delete

module.exports = router;
