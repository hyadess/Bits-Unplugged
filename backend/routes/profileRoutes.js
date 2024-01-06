const router = require("express").Router();
const authMiddleware = require("../service/tokenValidationService");
const ProfileController = require("../controller/profileController");
const profileController = new ProfileController();

router.use(authMiddleware);
router.get("/", profileController.getProfile);
router.post("/", profileController.setProfile);
router.put("/", profileController.updateProfile);
router.post("/upload", () => res.status(200)); // dihan - Upload profile picture
module.exports = router;
