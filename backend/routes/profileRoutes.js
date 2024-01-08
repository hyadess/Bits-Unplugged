const router = require("express").Router();
const authMiddleware = require("../service/tokenValidationService");
const ProfileController = require("../controller/profileController");
const profileController = new ProfileController();
const passport = require("passport");
router.use(
  passport.authenticate("jwt", { failureRedirect: "/invalid", session: false })
);
router.get("/", profileController.getProfile);
router.post("/", profileController.setProfile);
router.put("/", profileController.updateProfile);
router.post("/upload", (req, res) => res.status(200).send()); // dihan - Upload profile picture

router.get("/users", profileController.getProfile);
router.get("/setters", profileController.getProfile);
module.exports = router;
