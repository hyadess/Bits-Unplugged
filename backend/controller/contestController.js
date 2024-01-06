const Controller = require("./base");
const ContestRepository = require("../repository/contestRepository");
const contestRepository = new ContestRepository();
class ContestController extends Controller {
  constructor() {
    super();
  }
  getAllContests = async (req, res) => {
    
    let result = await contestRepository.getAllContests();
    this.handleResponse(result, res);

  };
  getAllPublishedContests = async (req, res) => {
    let result = await contestRepository.getAllPublishedContests();
    this.handleResponse(result, res);

  };
  getMyContests = async (req, res) => {
    let result = await contestRepository.getMyContests(
      req.body.user_id
    );
    this.handleResponse(result, res);
  };
  getMyOwnContests = async (req, res) => {
    let result = await contestRepository.getMyOwnContests(
      req.body.user_id
    );
    this.handleResponse(result, res);
  };

  getAllSubmissionsByContest = async (req, res) => {
    let result = await contestRepository.getAllSubmissionsByContest(
      req.params.contest_id
    );
    this.handleResponse(result, res);
  };
  getAllSubmissionsByUserAndContest = async (req, res) => {
    let result = await contestRepository.getAllSubmissionsByUserAndContest(
      req.body.user_id,
      req.params.contest_id
    );
    this.handleResponse(result, res);
  };

  getAllContestProblemsByContest = async (req, res) => {
    let result = await contestRepository.getAllContestProblemsByContest(
      req.params.contest_id
    );
    this.handleResponse(result, res);
  };
  getAllProblemsByContest = async (req, res) => {
    let result = await contestRepository.getAllProblemsByContest(
      req.params.contest_id
    );
    this.handleResponse(result, res);
  };

  addContest = async (req, res) => {
    let result = await contestRepository.addContest(
      req.body.user_id
    );
    this.handleResponse(result, res);
  };
  updateTitle = async (req, res) => {
    let result = await contestRepository.updateTitle(
      req.params.contest_id,
      req.body.title
    );
    this.handleResponse(result, res);
  };
  updateDescription = async (req, res) => {
    let result = await contestRepository.updateDescription(
      req.params.contest_id,
      req.body.description
    );
    this.handleResponse(result, res);
  };

  publishContest = async (req, res) => {
    let result = await contestRepository.publishContest(
      req.params.contest_id
    );
    this.handleResponse(result, res);
  };
  startContest = async (req, res) => {
    let result = await contestRepository.startContest(
      req.params.contest_id
    );
    this.handleResponse(result, res);
  };
  endContest = async (req, res) => {
    let result = await contestRepository.endContest(
      req.params.contest_id
    );
    this.handleResponse(result, res);
  };

  addCollaborator = async (req, res) => {
    let result = await contestRepository.addCollaborator(
      req.params.contest_id,
      req.body.collaborator_id
    );
    this.handleResponse(result, res);
  };
  showAllCollaborators = async (req, res) => {
    let result = await contestRepository.showAllCollaborators(
      req.params.contest_id
    );
    this.handleResponse(result, res);
  };

  addProblemToContest = async (req, res) => {
    let result = await contestRepository.addProblemToContest(
      req.body.problem_id,
      req.params.contest_id
      
    );
    this.handleResponse(result, res);
  };
  makeProblemEligible = async (req, res) => {
    let result = await contestRepository.makeProblemEligible(
      req.body.problem_id,
      req.params.contest_id
      
    );
    this.handleResponse(result, res);
  };
  makeProblemNotEligible = async (req, res) => {
    let result = await contestRepository.makeProblemNotEligible(
      req.body.problem_id,
      req.params.contest_id
      
    );
    this.handleResponse(result, res);
  };

  addSubmissionToContest = async (req, res) => {
    console.log(req.body.user_id);
    let result = await contestRepository.addSubmissionToContest(
      req.body.problem_id,
      req.params.contest_id,
      req.body.submission_id,
      req.body.user_id,
      req.body.points
      
    );
    this.handleResponse(result, res);
  };


  //new ones...

  deleteProblem = async (req, res) => {
    let result = await contestRepository.deleteProblem(
      req.params.contest_id,
      req.body.problem_id
    );
    this.handleResponse(result, res);
  };

  deleteContest = async (req, res) => {
    let result = await contestRepository.deleteContest(
      req.params.contest_id
    );
    this.handleResponse(result, res);
  };

  leaveUpcomingContest = async (req, res) => {
    let result = await contestRepository.leaveUpcomingContest(
      req.body.user_id,
      req.params.contest_id
    );
    this.handleResponse(result, res);
  };
  participateUpcomingContest = async (req, res) => {
    let result = await contestRepository.participateUpcomingContest(
      req.body.user_id,
      req.params.contest_id
    );
    this.handleResponse(result, res);
  };
  participateVirtualContest = async (req, res) => {
    let result = await contestRepository.participateVirtualContest(
      req.body.user_id,
      req.params.contest_id
    );
    this.handleResponse(result, res);
  };
  leaveVirtualContest = async (req, res) => {
    let result = await contestRepository.leaveVirtualContest(
      req.body.user_id,
      req.params.contest_id
    );
    this.handleResponse(result, res);
  };

  showAllLiveContestByUser = async (req, res) => {
    let result = await contestRepository.showAllLiveContestByUser(
      req.body.user_id
    );
    this.handleResponse(result, res);
  };
  showAllVirtualContestByUser = async (req, res) => {
    let result = await contestRepository.showAllVirtualContestByUser(
      req.body.user_id
    );
    this.handleResponse(result, res);
  };

  showLiveParticipantList = async (req, res) => {
    let result = await contestRepository.showLiveParticipantList(
      req.params.contest_id
    );
    this.handleResponse(result, res);
  };
  showVirtualParticipantList = async (req, res) => {
    let result = await contestRepository.showVirtualParticipantList(
      req.params.contest_id
    );
    this.handleResponse(result, res);
  };

  addClarification = async (req, res) => {
    let result = await contestRepository.addClarification(
      req.params.contest_id,
      req.body.title,
      req.body.description
    );
    this.handleResponse(result, res);
  };

  showAllClarifications = async (req, res) => {
    let result = await contestRepository.showAllClarifications(
      req.params.contest_id
    );
    this.handleResponse(result, res);
  };











  
  










  
}

module.exports = ContestController;
