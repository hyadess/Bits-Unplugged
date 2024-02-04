const router = require("express").Router();
const authMiddleware = require("../services/tokenValidationService");
const ContestController = require("../controllers/contestController");
const contestController = new ContestController();
const passport = require("passport");
router.use(
  passport.authenticate("jwt", { failureRedirect: "/invalid", session: false })
);
router.get("/", contestController.getAllContests);
router.get("/published", contestController.getAllPublishedContests);
router.get("/all", contestController.getMyContests);
router.get("/owned", contestController.getMyOwnContests);

router.get(
  "/:contestId/submissions",
  contestController.getAllSubmissionsByContest
);
router.get(
  "/:contestId/submissions/me",
  contestController.getAllSubmissionsByUserAndContest
);

router.get(
  "/:contestId/problems/setterView",
  contestController.getAllProblemsByContest
);
router.get(
  "/:contestId/problems/userView",
  contestController.getAllContestProblemsByContest
);

router.post("/addContest", contestController.addContest);
router.put("/:contestId/updateTitle", contestController.updateTitle);
router.put(
  "/:contestId/updateDescription",
  contestController.updateDescription
);
router.get("/:contestId", contestController.getContestInfo);

router.put("/:contestId/publish", contestController.publishContest);
router.put("/:contestId/start", contestController.startContest);
router.put("/:contestId/end", contestController.endContest);

router.post("/:contestId/addCollaborator", contestController.addCollaborator);
router.get(
  "/:contestId/showAllCollaborators",
  contestController.showAllCollaborators
);

router.post("/:contestId/createProblem", contestController.addProblemToContest);
router.put("/:contestId/makeEligible", contestController.makeProblemEligible);
router.put(
  "/:contestId/makeNotEligible",
  contestController.makeProblemNotEligible
);

router.post(
  "/:contestId/addSubmission",
  contestController.addSubmissionToContest
);

//new ones....

router.delete("/:contestId/deleteProblem", contestController.deleteProblem);
router.delete("/:contestId/delete", contestController.deleteContest);

router.post(
  "/:contestId/participate/live",
  contestController.participateUpcomingContest
);
router.delete("/:contestId/leave/live", contestController.leaveUpcomingContest);
router.post(
  "/:contestId/participate/virtual",
  contestController.participateVirtualContest
);
router.delete(
  "/:contestId/leave/virtual",
  contestController.leaveVirtualContest
);

router.get("/live/me", contestController.showAllLiveContestByUser);
router.get("/virtual/me", contestController.showAllVirtualContestByUser);

router.get(
  "/:contestId/participants/live",
  contestController.showLiveParticipantList
);
router.get(
  "/:contestId/participants/virtual",
  contestController.showVirtualParticipantList
);

router.get(
  "/:contestId/clarifications",
  contestController.showAllClarifications
);
router.post(
  "/:contestId/clarifications/add",
  contestController.addClarification
);

module.exports = router;
