import Api from "./base";

class ContestApi extends Api {
  getContestById = async (contestId) => {
    return await this.get("/contests/" + contestId);
  };

  updateContest = async (contestId, contest) => {
    return await this.put("/contests/" + contestId, contest);
  };

  getEditorial = async (contestId) => {
    return await this.get("/contests/" + contestId + "/editorial");
  };

  getAllContests = async () => {
    return await this.get("/contests");
  };

  getAllPublishedContests = async () => {
    return await this.get("/contests/published");
  };
  getAllParticipatedContests = async () => {
    return await this.get("/contests/participated");
  };

  getMyContests = async () => {
    return await this.get("/contests/all");
  };

  getMyOwnContests = async () => {
    return await this.get("/contests/owned");
  };
  getRunningContests = async () => {  
    return await this.get("/contests/running");
  };

  getAllSubmissionsByContest = async (contestId) => {
    return await this.get("/contests/" + contestId + "/submissions");
  };

  getContestInfo = async (contestId) => {
    return await this.get("/contests/" + contestId);
  };

  getAllSubmissionsByUserAndContest = async (contestId, username) => {
    return await this.get(
      "/contests/" + contestId + "/submissions/" + username
    );
  };

  getAllSubmissionsByContestAndProblem = async (contestId, problemId) => {
    return await this.get(
      "/contests/" + contestId + "/problems/" + problemId + "/submissions"
    );
  };

  getAllProblemsByContest = async (contestId) => {
    return await this.get("/contests/" + contestId + "/problems/setterView");
  };

  getContestProblemById = async (contestId, problemId) => {
    return await this.get("/contests/" + contestId + "/problem/" + problemId);
  };

  getAllContestProblemsByContest = async (contestId) => {
    return await this.get("/contests/" + contestId + "/problems/userView");
  };

  totalProblemCount = async (contestId) => {
    return await this.get("/contests/" + contestId + "/problemCount");
  };

  totalProblemSolved = async (contestId, userId) => {
    return await this.get("/contests/" + contestId + "/solvedCount/" + userId);
  };

  isContestProblemSolved = async (contestId, problemId) => {
    // console.log("problem id ==>", problemId);
    return await this.get("/contests/" + contestId + "/isSolved/" + problemId);
  };

  addContest = async (title) => {
    return await this.post("/contests/addContest", { title });
  };

  availableCollaborators = async (contestId) => {
    return await this.get("/contests/" + contestId + "/showSetters");
  };

  updateTitle = async (contestId, title) => {
    return await this.put("/contests/" + contestId + "/updateTitle", { title });
  };

  updateDescription = async (contestId, description) => {
    return await this.put("/contests/" + contestId + "/updateDescription", {
      description,
    });
  };

  publishContest = async (contestId) => {
    return await this.put("/contests/" + contestId + "/publish", {});
  };

  startContest = async (contestId) => {
    return await this.put("/contests/" + contestId + "/start", {});
  };

  endContest = async (contestId) => {
    return await this.put("/contests/" + contestId + "/end", {});
  };

  addCollaborator = async (contestId, collaboratorIds) => {
    return await this.post("/contests/" + contestId + "/addCollaborator", {
      collaboratorIds,
    });
  };

  acceptInvitation = async (contestId) => {
    console.log("Invitation from ", contestId);
    return await this.post(`/contests/${contestId}/accept-invitation`);
  };

  getLeaderboard = async (contestId, type) => {
    return await this.get(`/contests/${contestId}/Leaderboard/${type}`);
  };
  getTimeline = async (contestId) => {
    return await this.get(`/contests/${contestId}/Timeline`);
  };

  isRegistered = async (contestId) => {
    return await this.get(`/contests/${contestId}/isRegistered`);
  };

  showAllCollaborators = async (contestId) => {
    // console.log("===>", contestId);
    return await this.get("/contests/" + contestId + "/showAllCollaborators");
  };

  addProblemToContest = async (contestId, problemId) => {
    return await this.post("/contests/" + contestId + "/createProblem", {
      problemId,
    });
  };

  makeProblemEligible = async (contestId, problemId) => {
    return await this.put("/contests/" + contestId + "/makeEligible", {
      problemId,
    });
  };

  updatePoints = async (contestId, problemId, rating) => {
    return await this.put("/contests/" + contestId + "/updateRating", {
      problemId,
      rating,
    });
  };

  makeProblemNotEligible = async (contestId, problemId) => {
    return await this.put("/contests/" + contestId + "/makeNotEligible", {
      problemId,
    });
  };

  addSubmissionToContest = async (
    contestId,
    problemId,
    verdict,
    canvasData,
    userActivity,
    point,
    duration,
    image,
    submittedAt
  ) => {
    return await this.post("/contests/" + contestId + "/addSubmission", {
      problemId,
      verdict,
      canvasData,
      userActivity,
      point,
      duration,
      image,
      submittedAt,
    });
  };

  deleteProblem = async (contestId, problemId) => {
    console.log("contestId: ", contestId, "problemId: ", problemId);
    return await this.delete(
      "/contests/" + contestId + "/deleteProblem/" + problemId,
      {}
    );
  };

  deleteContest = async (contestId) => {
    return await this.delete("/contests/" + contestId + "/delete", {});
  };

  participateUpcomingContest = async (contestId) => {
    return await this.post("/contests/" + contestId + "/participate/live", {});
  };

  leaveUpcomingContest = async (contestId) => {
    return await this.delete("/contests/" + contestId + "/leave/live", {});
  };

  participateVirtualContest = async (contestId) => {
    return await this.post(
      "/contests/" + contestId + "/participate/virtual",
      {}
    );
  };

  leaveVirtualContest = async (contestId) => {
    return await this.delete("/contests/" + contestId + "/leave/virtual", {});
  };

  showAllLiveContestByUser = async () => {
    return await this.get("/contests/live/me");
  };

  showAllVirtualContestByUser = async () => {
    return await this.get("/contests/virtual/me");
  };

  showLiveParticipantList = async (contestId) => {
    return await this.get("/contests/" + contestId + "/participants/live");
  };

  showVirtualParticipantList = async (contestId) => {
    return await this.get("/contests/" + contestId + "/participants/virtual");
  };

  showVirtualParticipant = async (contestId) => {
    return await this.get("/contests/" + contestId + "/participant/virtual");
  };

  showAllClarifications = async (contestId) => {
    return await this.get("/contests/" + contestId + "/clarifications");
  };

  addClarification = async (contestId, clarification) => {
    return await this.post("/contests/" + contestId + "/clarifications/add", {
      clarification,
    });
  };

  approveContest = async (contestId) => {
    return await this.put("/contests/" + contestId + "/approve");
  };

  rejectContest = async (contestId) => {
    return await this.put("/contests/" + contestId + "/reject");
  };
}

export default ContestApi;
