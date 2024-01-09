const router = require("express").Router();
const authMiddleware = require("../service/tokenValidationService");
const AuthController = require("../controller/authController");
const authController = new AuthController();
const passport = require("passport");
router.get("/", authController.getAdminToken);
router.post("/login", authController.login);
router.post("/refresh-token", (req, res) =>
  res.status(200).json({
    access_token: "new_access_token",
    token_type: "bearer",
    expires_in: 3600,
  })
);
router.post("/signup", authController.signup);

router.post(
  "/change_pass",
  passport.authenticate("jwt", { failureRedirect: "/invalid", session: false }),
  (req, res) => res.status(200).send()
); // dihan - change password from profile
router.post("/forgot_pass", (req, res) => res.status(200).send()); // dihan - forgot password in login page
router.post("/reset_pass", (req, res) => res.status(200).send()); // dihan - reset password from the given link of forgot password
router.post(
  "/approve_setter/:id",
  passport.authenticate("jwt", { failureRedirect: "/invalid", session: false }),
  (req, res) => res.status(200).send()
); // dihan - Admin approval of problem setter registration
router.delete(
  "/delete_account/:userId",
  passport.authenticate("jwt", { failureRedirect: "/invalid", session: false }),
  authController.deleteAccount
); // dihan - Admin approval of problem setter registration
module.exports = router;
