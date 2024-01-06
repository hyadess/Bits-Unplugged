const router = require("express").Router();
const authMiddleware = require("../service/tokenValidationService");
const CanvasController = require("../controller/canvasController");
const canvasController = new CanvasController();

router.use(authMiddleware);

router.get("/", canvasController.getAllCanvas);
router.get("/live", canvasController.getAllCanvas); // pending
router.post("/", canvasController.addCanvas);
router.get("/:canvas_id", canvasController.getCanvasById);
router.put("/:canvas_id", canvasController.updateCanvas);
router.delete("/:canvas_id", canvasController.deleteCanvas);

module.exports = router;
