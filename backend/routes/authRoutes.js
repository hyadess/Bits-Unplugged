const router = require("express").Router();
const authMiddleware = require("../services/tokenValidationService");
const AuthController = require("../controllers/authController");
const authController = new AuthController();

const {
  requiresAdmin,
  authenticateJWT,
} = require("../middlewares/authMiddleware");

router.post("/login", authController.login);
router.post("/refresh", authController.refreshToken);
router.post("/signup", authController.signup);
router.post("/verify-email", authController.verifyEmail);

router.post("/change-pass", authenticateJWT, (req, res) =>
  res.status(200).send()
); // dihan - change password from profile
router.post("/forgot-pass", (req, res) => res.status(200).send()); // dihan - forgot password in login page
router.post("/reset-pass", (req, res) => res.status(200).send()); // dihan - reset password from the given link of forgot password
router.post("/approve-setter/:id", authenticateJWT, requiresAdmin, (req, res) =>
  res.status(200).send()
); // dihan - Admin approval of problem setter registration
router.delete(
  "/delete-account/:id",
  authenticateJWT,
  requiresAdmin,
  authController.deleteAccount
); // dihan - Admin approval of problem setter registration

router.post("/logout", authenticateJWT, (req, res) => {
  const expiredCookie = `refresh_token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;`;
  res.setHeader("Set-Cookie", expiredCookie);
  res.status(200).send();
});
module.exports = router;
