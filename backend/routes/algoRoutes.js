const router = require("express").Router();
const authMiddleware = require("../service/tokenValidationService");
const AlgoController = require("../controller/algoController");
const algoController = new AlgoController();

router.use(authMiddleware);

router.get("/by_topic/:topic_id", algoController.getAlgosByTopic);

router.get("/", algoController.getAllAlgos);
router.post("/", algoController.addAlgorithm);

router.get("/:algo_id", algoController.getAlgoById);
router.put("/:algo_id", algoController.updateAlgorithm);
router.delete("/:algo_id", algoController.deleteAlgorithm);

module.exports = router;
