const router = require("express").Router();
const authMiddleware = require("../service/tokenValidationService");
const ContestController = require("../controller/contestController");
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
  "/:contest_id/submissions",
  contestController.getAllSubmissionsByContest
);
router.get(
  "/:contest_id/submissions/me",
  contestController.getAllSubmissionsByUserAndContest
);

router.get(
  "/:contest_id/problems/setterView",
  contestController.getAllProblemsByContest
);
router.get(
  "/:contest_id/problems/userView",
  contestController.getAllContestProblemsByContest
);

router.post("/addContest", contestController.addContest);
router.put("/:contest_id/updateTitle", contestController.updateTitle);
router.put(
  "/:contest_id/updateDescription",
  contestController.updateDescription
);

router.put("/:contest_id/publish", contestController.publishContest);
router.put("/:contest_id/start", contestController.startContest);
router.put("/:contest_id/end", contestController.endContest);

router.post("/:contest_id/addCollaborator", contestController.addCollaborator);
router.get(
  "/:contest_id/showAllCollaborators",
  contestController.showAllCollaborators
);

router.post("/:contest_id/addProblem", contestController.addProblemToContest);
router.put("/:contest_id/makeEligible", contestController.makeProblemEligible);
router.put(
  "/:contest_id/makeNotEligible",
  contestController.makeProblemNotEligible
);

router.post(
  "/:contest_id/addSubmission",
  contestController.addSubmissionToContest
);

//new ones....

router.delete("/:contest_id/deleteProblem", contestController.deleteProblem);
router.delete("/:contest_id/delete", contestController.deleteContest);

router.post(
  "/:contest_id/participate/live",
  contestController.participateUpcomingContest
);
router.delete(
  "/:contest_id/leave/live",
  contestController.leaveUpcomingContest
);
router.post(
  "/:contest_id/participate/virtual",
  contestController.participateVirtualContest
);
router.delete(
  "/:contest_id/leave/virtual",
  contestController.leaveVirtualContest
);

router.get("/live/me", contestController.showAllLiveContestByUser);
router.get("/virtual/me", contestController.showAllVirtualContestByUser);

router.get(
  "/:contest_id/participants/live",
  contestController.showLiveParticipantList
);
router.get(
  "/:contest_id/participants/virtual",
  contestController.showVirtualParticipantList
);

router.get(
  "/:contest_id/clarifications",
  contestController.showAllClarifications
);
router.post(
  "/:contest_id/clarifications/add",
  contestController.addClarification
);

module.exports = router;
