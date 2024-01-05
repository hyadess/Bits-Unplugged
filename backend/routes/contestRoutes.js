const router = require("express").Router();
const authMiddleware = require("../service/tokenValidationService");
const ContestController = require("../controller/contestController");
const contestController = new ContestController();

router.use(authMiddleware);

router.get("/",contestController.getAllContests);
router.get("/published",contestController.getAllPublishedContests);
router.get("/all", contestController.getMyContests); 
router.get("/owned", contestController.getMyOwnContests); 

router.get("/:contest_id/submissions", contestController.getAllSubmissionsByContest);
router.get("/:contest_id/submissions/me", contestController.getAllSubmissionsByUserAndContest);

router.get("/:contest_id/problems/setterView", contestController.getAllProblemsByContest);
router.get("/:contest_id/problems/userView", contestController.getAllContestProblemsByContest);

router.post("/addContest",contestController.addContest);
router.put("/:contest_id/updateTitle",contestController.updateTitle);
router.put("/:contest_id/updateDescription",contestController.updateDescription);

router.put("/:contest_id/publish",contestController.publishContest);
router.put("/:contest_id/start",contestController.startContest);
router.put("/:contest_id/end",contestController.endContest);

router.post("/:contest_id/addCollaborator",contestController.addCollaborator);
router.get("/:contest_id/showAllCollaborators",contestController.showAllCollaborators);

router.post("/:contest_id/addProblem",contestController.addProblemToContest);
router.put("/:contest_id/makeEligible",contestController.makeProblemEligible);
router.put("/:contest_id/makeNotEligible",contestController.makeProblemNotEligible);

router.post("/:contest_id/addSubmission",contestController.addSubmissionToContest);






module.exports = router;