const router = require("express").Router();
const authMiddleware = require("../services/tokenValidationService");
const ProfileController = require("../controllers/profileController");
const profileController = new ProfileController();
const passport = require("passport");
router.use(
  passport.authenticate("jwt", { failureRedirect: "/invalid", session: false })
);

router.get("/", profileController.getProfile);
router.get("/:username", profileController.getProfileByUsername);
router.get("/search/:seachQuery", profileController.searchProfileByQuery);
router.post("/", profileController.setProfile);
router.put("/", profileController.updateProfile);
router.post("/set/upload", (req, res) => res.status(200).send()); // dihan - Upload profile picture

router.get("/users", profileController.getProfile);
router.get("/setters", profileController.getProfile);
router.get("/getId/:username", profileController.getIdByUsername);
module.exports = router; 
