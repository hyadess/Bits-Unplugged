const router = require("express").Router();
const authMiddleware = require("../services/tokenValidationService");
const CanvasController = require("../controllers/canvasController");
const canvasController = new CanvasController();
const passport = require("passport");
router.use(
  passport.authenticate("jwt", { failureRedirect: "/invalid", session: false })
);

router.get("/", canvasController.getAllCanvases);
router.post("/", canvasController.createCanvas);
router.get("/:id", canvasController.getCanvasById);
router.put("/:id", canvasController.updateCanvas);
router.delete("/:id", canvasController.deleteCanvas);

// router.get("/live", canvasController.getAllCanvases); // pending
module.exports = router;
