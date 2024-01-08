const Controller = require("./base");
const ContestRepository = require("../repository/contestRepository");
const contestRepository = new ContestRepository();
class ContestController extends Controller {
  constructor() {
    super();
  }
  getAllContests = async (req, res) => {
    let result = await contestRepository.getAllContests();
    if (result.success) {
      res.status(200).json(result.data);
    } else {
      res.status(404).json(result);
    }
  };
  getAllPublishedContests = async (req, res) => {
    let result = await contestRepository.getAllPublishedContests();
    if (result.success) {
      res.status(200).json(result.data);
    } else {
      res.status(404).json(result);
    }
  };
  getMyContests = async (req, res) => {
    let result = await contestRepository.getMyContests(req.user.user_id);
    if (result.success) {
      res.status(200).json(result.data);
    } else {
      res.status(404).json(result);
    }
  };
  getMyOwnContests = async (req, res) => {
    let result = await contestRepository.getMyOwnContests(req.user.user_id);
    if (result.success) {
      res.status(200).json(result.data);
    } else {
      res.status(404).json(result);
    }
  };

  getAllSubmissionsByContest = async (req, res) => {
    let result = await contestRepository.getAllSubmissionsByContest(
      req.params.contest_id
    );
    if (result.success) {
      res.status(200).json(result.data);
    } else {
      res.status(404).json(result);
    }
  };
  getAllSubmissionsByUserAndContest = async (req, res) => {
    let result = await contestRepository.getAllSubmissionsByUserAndContest(
      req.user.user_id,
      req.params.contest_id
    );
    if (result.success) {
      res.status(200).json(result.data);
    } else {
      res.status(404).json(result);
    }
  };

  getAllContestProblemsByContest = async (req, res) => {
    let result = await contestRepository.getAllContestProblemsByContest(
      req.params.contest_id
    );
    if (result.success) {
      res.status(200).json(result.data);
    } else {
      res.status(404).json(result);
    }
  };
  getAllProblemsByContest = async (req, res) => {
    let result = await contestRepository.getAllProblemsByContest(
      req.params.contest_id
    );
    if (result.success) {
      res.status(200).json(result.data);
    } else {
      res.status(404).json(result);
    }
  };

  addContest = async (req, res) => {
    let result = await contestRepository.addContest(req.user.user_id);
    if (result.success) {
      res.status(201).json(result.data);
    } else {
      res.status(500).json(result);
    }
  };
  updateTitle = async (req, res) => {
    let result = await contestRepository.updateTitle(
      req.params.contest_id,
      req.body.title
    );
    if (result.success) {
      res.status(204).json(result.data);
    } else {
      res.status(500).json(result);
    }
  };
  updateDescription = async (req, res) => {
    let result = await contestRepository.updateDescription(
      req.params.contest_id,
      req.body.description
    );
    if (result.success) {
      res.status(204).json(result.data);
    } else {
      res.status(500).json(result);
    }
  };

  publishContest = async (req, res) => {
    let result = await contestRepository.publishContest(req.params.contest_id);
    if (result.success) {
      res.status(204).json(result.data);
    } else {
      res.status(500).json(result);
    }
  };
  startContest = async (req, res) => {
    let result = await contestRepository.startContest(req.params.contest_id);
    if (result.success) {
      res.status(204).json(result.data);
    } else {
      res.status(500).json(result);
    }
  };
  endContest = async (req, res) => {
    let result = await contestRepository.endContest(req.params.contest_id);
    if (result.success) {
      res.status(204).json(result.data);
    } else {
      res.status(500).json(result);
    }
  };

  addCollaborator = async (req, res) => {
    let result = await contestRepository.addCollaborator(
      req.params.contest_id,
      req.body.collaborator_id
    );
    if (result.success) {
      res.status(204).json(result.data);
    } else {
      res.status(500).json(result);
    }
  };
  showAllCollaborators = async (req, res) => {
    let result = await contestRepository.showAllCollaborators(
      req.params.contest_id
    );
    if (result.success) {
      res.status(200).json(result.data);
    } else {
      res.status(404).json(result);
    }
  };

  addProblemToContest = async (req, res) => {
    let result = await contestRepository.addProblemToContest(
      req.body.problem_id,
      req.params.contest_id
    );
    if (result.success) {
      res.status(204).json(result.data);
    } else {
      res.status(500).json(result);
    }
  };
  makeProblemEligible = async (req, res) => {
    let result = await contestRepository.makeProblemEligible(
      req.body.problem_id,
      req.params.contest_id
    );
    if (result.success) {
      res.status(204).json(result.data);
    } else {
      res.status(500).json(result);
    }
  };
  makeProblemNotEligible = async (req, res) => {
    let result = await contestRepository.makeProblemNotEligible(
      req.body.problem_id,
      req.params.contest_id
    );
    if (result.success) {
      res.status(204).json(result.data);
    } else {
      res.status(500).json(result);
    }
  };

  addSubmissionToContest = async (req, res) => {
    console.log(req.user.user_id);
    let result = await contestRepository.addSubmissionToContest(
      req.body.problem_id,
      req.params.contest_id,
      req.body.submission_id,
      req.user.user_id,
      req.body.points
    );
    if (result.success) {
      res.status(204).json(result.data);
    } else {
      res.status(500).json(result);
    }
  };

  //new ones...

  deleteProblem = async (req, res) => {
    let result = await contestRepository.deleteProblem(
      req.params.contest_id,
      req.body.problem_id
    );
    if (result.success) {
      res.status(204).json(result.data);
    } else {
      res.status(500).json(result);
    }
  };

  deleteContest = async (req, res) => {
    let result = await contestRepository.deleteContest(req.params.contest_id);
    if (result.success) {
      res.status(204).json(result.data);
    } else {
      res.status(500).json(result);
    }
  };

  leaveUpcomingContest = async (req, res) => {
    let result = await contestRepository.leaveUpcomingContest(
      req.user.user_id,
      req.params.contest_id
    );
    if (result.success) {
      res.status(204).json(result.data);
    } else {
      res.status(500).json(result);
    }
  };
  participateUpcomingContest = async (req, res) => {
    let result = await contestRepository.participateUpcomingContest(
      req.user.user_id,
      req.params.contest_id
    );
    if (result.success) {
      res.status(201).json(result.data);
    } else {
      res.status(500).json(result);
    }
  };
  participateVirtualContest = async (req, res) => {
    let result = await contestRepository.participateVirtualContest(
      req.user.user_id,
      req.params.contest_id
    );
    if (result.success) {
      res.status(201).json(result.data);
    } else {
      res.status(500).json(result);
    }
  };
  leaveVirtualContest = async (req, res) => {
    let result = await contestRepository.leaveVirtualContest(
      req.user.user_id,
      req.params.contest_id
    );
    if (result.success) {
      res.status(204).json(result.data);
    } else {
      res.status(500).json(result);
    }
  };

  showAllLiveContestByUser = async (req, res) => {
    let result = await contestRepository.showAllLiveContestByUser(
      req.user.user_id
    );
    if (result.success) {
      res.status(200).json(result.data);
    } else {
      res.status(404).json(result);
    }
  };
  showAllVirtualContestByUser = async (req, res) => {
    let result = await contestRepository.showAllVirtualContestByUser(
      req.user.user_id
    );
    if (result.success) {
      res.status(200).json(result.data);
    } else {
      res.status(404).json(result);
    }
  };

  showLiveParticipantList = async (req, res) => {
    let result = await contestRepository.showLiveParticipantList(
      req.params.contest_id
    );
    if (result.success) {
      res.status(200).json(result.data);
    } else {
      res.status(404).json(result);
    }
  };
  showVirtualParticipantList = async (req, res) => {
    let result = await contestRepository.showVirtualParticipantList(
      req.params.contest_id
    );
    if (result.success) {
      res.status(200).json(result.data);
    } else {
      res.status(404).json(result);
    }
  };

  addClarification = async (req, res) => {
    let result = await contestRepository.addClarification(
      req.params.contest_id,
      req.body.title,
      req.body.description
    );
    if (result.success) {
      res.status(201).json(result.data);
    } else {
      res.status(500).json(result);
    }
  };

  showAllClarifications = async (req, res) => {
    let result = await contestRepository.showAllClarifications(
      req.params.contest_id
    );
    if (result.success) {
      res.status(200).json(result.data);
    } else {
      res.status(404).json(result);
    }
  };
}

module.exports = ContestController;
