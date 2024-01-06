const router = require("express").Router();
const authMiddleware = require("../service/tokenValidationService");
const AuthController = require("../controller/authController");
const authController = new AuthController();

router.get("/", authController.getAdminToken);
router.post("/login", authController.login);
router.post("/signup", authController.signup);

router.post("/change_pass", authMiddleware, () => res.status(200)); // dihan
router.post("/forgot_pass", () => res.status(200)); // dihan
router.post("/reset_pass", () => res.status(200)); // dihan
router.post("/approve_setter/:id",authMiddleware, () => res.status(200)); // dihan
module.exports = router;
