const router = require("express").Router();
const authMiddleware = require("../services/tokenValidationService");
const AuthController = require("../controllers/authController");
const authController = new AuthController();
const passport = require("passport");
router.get("/", authController.getAdminToken);
router.post("/login", authController.login);
router.post("/refresh-token", authController.refreshToken);
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
  "/delete_account/:id",
  passport.authenticate("jwt", { failureRedirect: "/invalid", session: false }),
  authController.deleteAccount
); // dihan - Admin approval of problem setter registration

router.post(
  "/logout",
  passport.authenticate("jwt", { failureRedirect: "/invalid", session: false }),
  (req, res) => {
    const expiredCookie = `refresh_token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;`;
    res.setHeader("Set-Cookie", expiredCookie);
    res.status(200).send();
  }
); 
module.exports = router;
