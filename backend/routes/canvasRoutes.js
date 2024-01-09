const router = require("express").Router();
const authMiddleware = require("../service/tokenValidationService");
const CanvasController = require("../controller/canvasController");
const canvasController = new CanvasController();
const passport = require("passport");
router.use(
  passport.authenticate("jwt", { failureRedirect: "/invalid", session: false })
);
router.get("/", canvasController.getAllCanvas);
router.get("/live", canvasController.getAllCanvas); // pending
router.post("/", canvasController.addCanvas);
router.get("/:canvasId", canvasController.getCanvasById);
router.put("/:canvasId", canvasController.updateCanvas);
router.delete("/:canvasId", canvasController.deleteCanvas);

module.exports = router;
