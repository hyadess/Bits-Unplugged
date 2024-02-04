import Api from "./base";

class ContestApi extends Api {
  getContestById = async (contestId) => {
    return await this.get("/contests/"+contestId);
  };

  getAllContests = async () => {
    return await this.get("/contests");
  };

  getAllPublishedContests = async () => {
    return await this.get("/contests/published");
  };

  getMyContests = async () => {
    return await this.get("/contests/all");
  };

  getMyOwnContests = async () => {
    return await this.get("/contests/owned");
  };

  getAllSubmissionsByContest = async (contestId) => {
    return await this.get("/contests/"+contestId+"/submissions");
  };

  getContestInfo = async (contestId) => { 
    return await this.get("/contests/"+contestId);
  };

  getAllSubmissionsByUserAndContest = async (contestId) => {
    return await this.get("/contests/"+contestId+"/submissions/me");
  };

  getAllProblemsByContest = async (contestId) => {
    return await this.get("/contests/"+contestId+"/problems/setterView");
  };

  getAllContestProblemsByContest = async (contestId) => {
    return await this.get("/contests/"+contestId+"/problems/userView");
  };

  addContest = async (title) => {
    return await this.post("/contests/addContest", {title});
  };
  updateDates = async (contestId, startDate, endDate) => {
    return await this.post("/contests/"+contestId+"/updateDates", { startDate, endDate });  
  };
  availableCollaborators = async () => {
    return await this.get("/contests/showSetters");
  };

  updateTitle = async (contestId, title) => {
    return await this.put("/contests/"+contestId+"/updateTitle", { title });
  };

  updateDescription = async (contestId, description) => {
    return await this.put("/contests/"+contestId+"/updateDescription", { description });
  };

  publishContest = async (contestId) => {
    return await this.put("/contests/"+contestId+"/publish", {});
  };

  startContest = async (contestId) => {
    return await this.put("/contests/"+contestId+"/start", {});
  };

  endContest = async (contestId) => {
    return await this.put("/contests/"+contestId+"/end", {});
  };

  addCollaborator = async (contestId, collaboratorId) => {
    return await this.post("/contests/"+contestId+"/addCollaborator", { collaboratorId });
  };

  showAllCollaborators = async (contestId) => {
    return await this.get("/contests/"+contestId+"/showAllCollaborators");
  };

  addProblemToContest = async (contestId, title) => {
    return await this.post("/contests/"+contestId+"/createProblem", { title });
  };

  makeProblemEligible = async (contestId, problemId) => {
    return await this.put("/contests/"+contestId+"/makeEligible", { problemId });
  };

  makeProblemNotEligible = async (contestId, problemId) => {
    return await this.put("/contests/"+contestId+"/makeNotEligible", { problemId });
  };

  addSubmissionToContest = async (contestId) => {
    return await this.post("/contests/"+contestId+"/addSubmission", {});
  };

  deleteProblem = async (contestId, problemId) => {
    return await this.delete("/contests/"+contestId+"/deleteProblem", { problemId });
  };

  deleteContest = async (contestId) => {
    return await this.delete("/contests/"+contestId+"/delete", {});
  };

  participateUpcomingContest = async (contestId) => {
    return await this.post("/contests/"+contestId+"/participate/live", {});
  };

  leaveUpcomingContest = async (contestId) => {
    return await this.delete("/contests/"+contestId+"/leave/live", {});
  };

  participateVirtualContest = async (contestId) => {
    return await this.post("/contests/"+contestId+"/participate/virtual", {});
  };

  leaveVirtualContest = async (contestId) => {
    return await this.delete("/contests/"+contestId+"/leave/virtual", {});
  };

  showAllLiveContestByUser = async () => {
    return await this.get("/contests/live/me");
  };

  showAllVirtualContestByUser = async () => {
    return await this.get("/contests/virtual/me");
  };

  showLiveParticipantList = async (contestId) => {
    return await this.get("/contests/"+contestId+"/participants/live");
  };

  showVirtualParticipantList = async (contestId) => {
    return await this.get("/contests/"+contestId+"/participants/virtual");
  };

  showAllClarifications = async (contestId) => {
    return await this.get("/contests/"+contestId+"/clarifications");
  };

  addClarification = async (contestId, clarification) => {
    return await this.post("/contests/"+contestId+"/clarifications/add", { clarification });
  };
}

export default ContestApi;
