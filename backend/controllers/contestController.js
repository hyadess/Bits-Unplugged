const Controller = require("./base");
const ContestRepository = require("../repositories/contestRepository");
const sendMail = require("../services/email");
const contestRepository = new ContestRepository();
class ContestController extends Controller {
  constructor() {
    super();
  }
  getAllContests = async (req, res) => {
    this.handleRequest(res, async () => {
      let contests =
        req.user.type === 0
          ? await contestRepository.getAllContests()
          : req.user.type === 2
          ? await contestRepository.getSubmittedContests()
          : null;
      res.status(200).json(contests);
    });
  };

  updateContest = async (req, res) => {
    this.handleRequest(res, async () => {
      const updatedContest = await contestRepository.updateContest(
        req.params.id,
        req.body
      );
      if (!updatedContest) {
        res.status(404).json({ error: "Contest not found" });
      } else {
        res.status(200).json(updatedContest);
      }
    });
  };
  getEditorial = async (req, res) => {
    this.handleRequest(res, async () => {
      let editorial = await contestRepository.getEditorial(
        req.params.contestId
      );
      res.status(200).json(editorial);
    });
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
    let result = await contestRepository.getMyContests(req.user.userId);
    if (result.success) {
      res.status(200).json(result.data);
    } else {
      res.status(404).json(result);
    }
  };
  getContestInfo = async (req, res) => {
    let result = await contestRepository.getContestInfo(req.params.contestId);
    if (result.success) {
      res.status(200).json(result.data);
    } else {
      res.status(404).json(result);
    }
  };
  getMyOwnContests = async (req, res) => {
    let result = await contestRepository.getMyOwnContests(req.user.userId);
    if (result.success) {
      res.status(200).json(result.data);
    } else {
      res.status(404).json(result);
    }
  };

  getAllSubmissionsByContest = async (req, res) => {
    let result = await contestRepository.getAllSubmissionsByContest(
      req.params.contestId
    );
    if (result.success) {
      res.status(200).json(result.data);
    } else {
      res.status(404).json(result);
    }
  };
  getAllSubmissionsByUserAndContest = async (req, res) => {
    let result = await contestRepository.getAllSubmissionsByUserAndContest(
      req.params.contestId,
      req.params.username
    );
    if (result.success) {
      res.status(200).json(result.data);
    } else {
      res.status(404).json(result);
    }
  };
  getAllSubmissionsByContestAndProblem = async (req, res) => {
    let result = await contestRepository.getAllSubmissionsByContestAndProblem(
      req.params.contestId,
      req.params.problemId
    );
    if (result.success) {
      res.status(200).json(result.data);
    } else {
      res.status(404).json(result);
    }
  };

  isContestProblemSolved = async (req, res) => {
    let result = await contestRepository.isContestProblemSolved(
      req.user.userId,
      req.params.contestId,
      req.params.problemId
    );
    if (result.success) {
      res.status(200).json(result.data);
    } else {
      res.status(404).json(result);
    }
  };

  totalProblemSolved = async (req, res) => {
    let result = await contestRepository.totalProblemSolved(
      req.params.userId,
      req.params.contestId
    );
    if (result.success) {
      res.status(200).json(result.data);
    } else {
      res.status(404).json(result);
    }
  };

  getAllContestProblemsByContest = async (req, res) => {
    let result = await contestRepository.getAllContestProblemsByContest(
      req.params.contestId
    );
    if (result.success) {
      res.status(200).json(result.data);
    } else {
      res.status(404).json(result);
    }
  };
  getContestProblemById = async (req, res) => {
    let result = await contestRepository.getContestProblemById(
      req.params.contestId,
      req.params.problemId
    );
    if (result.success) {
      res.status(200).json(result.data);
    } else {
      res.status(404).json(result);
    }
  };
  getAllProblemsByContest = async (req, res) => {
    let result = await contestRepository.getAllProblemsByContest(
      req.user.userId,
      req.params.contestId
    );
    if (result.success) {
      res.status(200).json(result.data);
    } else {
      res.status(404).json(result);
    }
  };

  totalProblemCountByContest = async (req, res) => {
    let result = await contestRepository.totalProblemCountByContest(
      req.params.contestId
    );
    if (result.success) {
      res.status(200).json(result.data);
    } else {
      res.status(404).json(result);
    }
  };

  addContest = async (req, res) => {
    let result = await contestRepository.addContest(
      req.user.userId,
      req.body.title
    );
    if (result.success) {
      res.status(201).json(result.data);
    } else {
      res.status(500).json(result);
    }
  };
  updateTitle = async (req, res) => {
    let result = await contestRepository.updateTitle(
      req.params.contestId,
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
      req.params.contestId,
      req.body.description
    );
    if (result.success) {
      res.status(204).json(result.data);
    } else {
      res.status(500).json(result);
    }
  };

  publishContest = async (req, res) => {
    let result = await contestRepository.publishContest(req.params.contestId);
    if (result.success) {
      res.status(204).json(result.data);
    } else {
      res.status(500).json(result);
    }
  };
  startContest = async (req, res) => {
    let result = await contestRepository.startContest(req.params.contestId);
    if (result.success) {
      res.status(204).json(result.data);
    } else {
      res.status(500).json(result);
    }
  };
  endContest = async (req, res) => {
    let result = await contestRepository.endContest(req.params.contestId);
    if (result.success) {
      res.status(204).json(result.data);
    } else {
      res.status(500).json(result);
    }
  };

  availableCollaborators = async (req, res) => {
    let result = await contestRepository.availableCollaborators(
      req.user.userId,
      req.params.contestId
    );
    if (result.success) {
      res.status(200).json(result.data);
    } else {
      res.status(404).json(result);
    }
  };

  collabRequest = async (req, res) => {
    let result = await contestRepository.getRequestedCollaborators(
      req.params.setterId
    );
    if (result.success) {
      sendMail(
        result.data[0].email,
        "Collaboration Request",
        "You have a collaboration request from " +
          req.user.email +
          " for contest " +
          req.params.contestId
      );
      res.status(200).json(result.data);
    } else {
      res.status(404).json(result);
    }
  };

  addCollaborator = async (req, res) => {
    this.handleRequest(res, async () => {
      let result = await contestRepository.addCollaborator(
        req.params.contestId,
        req.body.collaboratorIds,
        req.headers.origin
      );
      if (result.success) {
        res.status(204).json(result.data);
      } else {
        res.status(500).json(result);
      }
    });
  };

  acceptInvitation = async (req, res) => {
    try {
      console.log(req.params);
      const contestId = req.params.contestId;
      const setterId = req.user.userId;
      const result = await contestRepository.acceptInvitation(
        contestId,
        setterId
      );

      res.status(200).json({ success: true, result });
    } catch (error) {
      console.error("Error accepting invitation:", error);
      res.status(500).json({ success: false, error: "Internal Server Error" });
    }
  };

  showAllCollaborators = async (req, res) => {
    let result = await contestRepository.showAllCollaborators(
      req.params.contestId
    );
    if (result.success) {
      res.status(200).json(result.data);
    } else {
      res.status(404).json(result);
    }
  };

  addProblemToContest = async (req, res) => {
    let result = await contestRepository.addProblemToContest(
      req.body.problemId,
      req.params.contestId
    );
    if (result.success) {
      res.status(204).json(result.data);
    } else {
      res.status(500).json(result);
    }
  };
  makeProblemEligible = async (req, res) => {
    let result = await contestRepository.makeProblemEligible(
      req.body.problemId,
      req.params.contestId
    );
    if (result.success) {
      res.status(204).json(result.data);
    } else {
      res.status(500).json(result);
    }
  };
  updateRating = async (req, res) => {
    let result = await contestRepository.updateRating(
      req.body.problemId,
      req.params.contestId,
      req.body.rating
    );
    if (result.success) {
      res.status(204).json(result.data);
    } else {
      res.status(500).json(result);
    }
  };
  makeProblemNotEligible = async (req, res) => {
    let result = await contestRepository.makeProblemNotEligible(
      req.body.problemId,
      req.params.contestId
    );
    if (result.success) {
      res.status(204).json(result.data);
    } else {
      res.status(500).json(result);
    }
  };

  addSubmissionToContest = async (req, res) => {
    console.log(req.user.userId);
    let result = await contestRepository.addSubmissionToContest(
      req.body.problemId,
      req.params.contestId,
      req.user.userId,
      req.body.verdict,
      req.body.canvasData,
      req.body.userActivity,
      req.body.point,
      req.body.duration,
      req.body.image,
      req.body.submittedAt
    );
    if (result.success) {
      res.status(204).json(result.data);
    } else {
      res.status(500).json(result);
    }
  };

  getLeaderboard = async (req, res) => {
    let result = await contestRepository.getLeaderboard(req.params.contestId);
    if (result.success) {
      res.status(200).json(result.data);
    } else {
      res.status(404).json(result);
    }
  };

  IsRegistered = async (req, res) => {
    let result = await contestRepository.IsRegistered(
      req.user.userId,
      req.params.contestId
    );
    console.log("register", result);

    if (result.success) {
      res.status(200).json(result.data);
    } else {
      res.status(404).json(result);
    }
  };

  getTimeline = async (req, res) => {
    let result = await contestRepository.getTimeline(req.params.contestId);
    if (result.success) {
      res.status(200).json(result.data);
    } else {
      res.status(404).json(result);
    }
  };

  //new ones...

  deleteProblem = async (req, res) => {
    let result = await contestRepository.deleteProblem(
      req.params.contestId,
      req.params.problemId
    );
    if (result.success) {
      res.status(204).json(result.data);
    } else {
      res.status(500).json(result);
    }
  };

  deleteContest = async (req, res) => {
    let result = await contestRepository.deleteContest(req.params.contestId);
    if (result.success) {
      res.status(204).json(result.data);
    } else {
      res.status(500).json(result);
    }
  };

  leaveUpcomingContest = async (req, res) => {
    let result = await contestRepository.leaveUpcomingContest(
      req.user.userId,
      req.params.contestId
    );
    if (result.success) {
      res.status(204).json(result.data);
    } else {
      res.status(500).json(result);
    }
  };
  participateUpcomingContest = async (req, res) => {
    let result = await contestRepository.participateUpcomingContest(
      req.user.userId,
      req.params.contestId
    );
    if (result.success) {
      res.status(201).json(result.data);
    } else {
      res.status(500).json(result);
    }
  };

  participateVirtualContest = async (req, res) => {
    let result = await contestRepository.participateVirtualContest(
      req.user.userId,
      req.params.contestId
    );
    if (result.success) {
      res.status(201).json(result.data);
    } else {
      res.status(500).json(result);
    }
  };
  leaveVirtualContest = async (req, res) => {
    let result = await contestRepository.leaveVirtualContest(
      req.user.userId,
      req.params.contestId
    );
    if (result.success) {
      res.status(204).json(result.data);
    } else {
      res.status(500).json(result);
    }
  };

  showAllLiveContestByUser = async (req, res) => {
    let result = await contestRepository.showAllLiveContestByUser(
      req.user.userId
    );
    if (result.success) {
      res.status(200).json(result.data);
    } else {
      res.status(404).json(result);
    }
  };
  showAllVirtualContestByUser = async (req, res) => {
    let result = await contestRepository.showAllVirtualContestByUser(
      req.user.userId
    );
    if (result.success) {
      res.status(200).json(result.data);
    } else {
      res.status(404).json(result);
    }
  };

  showLiveParticipantList = async (req, res) => {
    let result = await contestRepository.showLiveParticipantList(
      req.params.contestId
    );
    if (result.success) {
      res.status(200).json(result.data);
    } else {
      res.status(404).json(result);
    }
  };
  showVirtualParticipantList = async (req, res) => {
    let result = await contestRepository.showVirtualParticipantList(
      req.params.contestId
    );
    if (result.success) {
      res.status(200).json(result.data);
    } else {
      res.status(404).json(result);
    }
  };

  addClarification = async (req, res) => {
    let result = await contestRepository.addClarification(
      req.params.contestId,
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
      req.params.contestId
    );
    if (result.success) {
      res.status(200).json(result.data);
    } else {
      res.status(404).json(result);
    }
  };

  approveContest = async (req, res) => {
    let result = await contestRepository.approveContest(req.params.contestId);
    if (result.success) {
      res.status(204).json(result.data);
    } else {
      res.status(500).json(result);
    }
  };

  rejectContest = async (req, res) => {
    let result = await contestRepository.rejectContest(req.params.contestId);
    if (result.success) {
      res.status(204).json(result.data);
    } else {
      res.status(500).json(result);
    }
  };
}

module.exports = ContestController;
