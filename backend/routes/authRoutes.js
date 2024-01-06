const router = require("express").Router();
const authMiddleware = require("../service/tokenValidationService");
const AuthController = require("../controller/authController");
const authController = new AuthController();

router.get("/", authController.getAdminToken);
router.post("/login", authController.login);
router.post("/signup", authController.signup);

router.post("/change_pass", authMiddleware, () => res.status(200)); // dihan - change password from profile
router.post("/forgot_pass", () => res.status(200)); // dihan - forgot password in login page
router.post("/reset_pass", () => res.status(200)); // dihan - reset password from the given link of forgot password
router.post("/approve_setter/:id",authMiddleware, () => res.status(200)); // dihan - Admin approval of problem setter registration
module.exports = router;
