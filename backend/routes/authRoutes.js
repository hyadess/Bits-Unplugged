const router = require("express").Router();
const authMiddleware = require("../service/tokenValidationService");
const AuthController = require("../controller/authController");
const authController = new AuthController();

router.get("/", authController.getAdminToken);
router.post("/login", authController.login);
router.post("/signup", authController.signup);

router.post("/change_pass", authMiddleware, (req, res) => res.status(200).send()); // dihan - change password from profile
router.post("/forgot_pass", (req, res) => res.status(200).send()); // dihan - forgot password in login page
router.post("/reset_pass", (req, res) => res.status(200).send()); // dihan - reset password from the given link of forgot password
router.post("/approve_setter/:id",authMiddleware, (req, res) => res.status(200).send()); // dihan - Admin approval of problem setter registration
module.exports = router;
