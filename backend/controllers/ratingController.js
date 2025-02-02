const Controller = require("./base");
const RatingRepository = require("../repositories/ratingRepository");
const ratingRepository = new RatingRepository();
const ContestRepository = require("../repositories/contestRepository");
const contestRepository = new ContestRepository();

class RatingController extends Controller {
  constructor() {
    super();
  }
  //user rating table................
  getCurrentRating = async (req, res) => {
    // console.log("->", Freq.params);
    const result = await ratingRepository.getCurrentRating(req.params.userId);
    if (result.success) {
      res.status(200).json(result.data);
    } else {
      res.status(500).json(result);
    }
  };

  getRatingHistory = async (req, res) => {
    const result = await ratingRepository.getRatingHistory(req.params.userId);
    if (result.success) {
      res.status(200).json(result.data);
    } else {
      res.status(500).json(result);
    }
  };

  updateRating = async (req, res) => {
    const result = await ratingRepository.updateRating(
      req.user.userId,
      req.body.newRating
    );
    if (result.success) {
      res.status(202).json({ message: "Rating updated successfully" });
    } else {
      res.status(500).json({ message: "Rating update failed" });
    }
  };
  showAllUserRatings = async (req, res) => {
    const result = await ratingRepository.showAllUserRatings();
    if (result.success) {
      res.status(200).json(result.data);
    } else {
      res.status(500).json(result);
    }
  };

  //userRating affecting problem rating.........................

  ratingUpdateHandler = async (problemId, timestamp) => {
    const minDif = 0;
    const problem = await ratingRepository.getProblemById(problemId);

    if (problem.data.length > 0) {
      var date1 = new Date(problem.data[0].ratingUpdated).getTime();
      var date2 = new Date().getTime();

      var difference = Math.abs(date2 - date1);

      var differenceInDays = difference / (1000 * 3600 * 24);

      //console.log("*********************************rating handler called",differenceInDays);
      if (differenceInDays >= minDif) {
        this.updateProblemRating(problemId, timestamp);
      }
    }
  };

  getUserRatingsAndAttemptsByProblem = async (problemId) => {
    const result = await ratingRepository.getUserRatingsAndAttemptsByProblem(
      problemId
    );
    if (result.success) {
      // console.log(result.data);
      return result.data;
    } else {
      return null;
    }
  };

  getLatestProblemsWithRatings = async () => {
    const result = await ratingRepository.getLatestProblemsWithRatings();
    if (result.success) {
      ///console.log(result.data);
      return result.data;
    } else {
      return null;
    }
  };

  updateProblemRating = async (problemId, timestamp) => {
    const res = await ratingRepository.getProblemById(problemId);

    //console.log("*********************************rating handler called",problem)

    if (res.data.length > 0) {
      const userActivity = await this.getUserRatingsAndAttemptsByProblem(
        problemId
      );
      //console.log("*********************************rating handler called",timestamp)
      const problem = res.data[0];
      //console.log(userActivity);
      if (userActivity.length > 0) {
        //console.log(problem.id,problem.rating,userActivity.length);
        let newRating = 0;
        let sum = 0;
        userActivity.forEach((activity) => {
          const userRating = activity.rating;
          console.log("userRating", userRating);
          let dif = Math.abs(problem.rating - userRating);
          const wa = activity.failed_submissions;
          const duration = activity.duration;
          console.log("wa and duration and dif", wa, duration, dif);
          let cur =
            0.3 * (800 + wa * 50) + 0.7 * (800 + Math.max(duration - 10, 0));
          console.log("cur", cur);
          //cur=(3500.0-800.0) / (1.0 + Math.exp(-0.1 *cur))+800.0;
          if (cur < 800.0) {
            cur = 800.0;
          }
          if (cur > 3500.0) {
            cur = 3500.0;
          }

          dif = 4000 - dif;
          console.log("rating difference and cur", dif, cur);
          sum += dif;
          newRating += dif * cur;
        });
        if (sum != 0) {
          newRating /= sum;
          newRating = Math.round(newRating);
          console.log(problem.id, problem.rating, newRating);
          const res = await ratingRepository.updateProblemRating(
            problem.id,
            newRating,
            timestamp
          );
          if (!res.success) flag = false;
        }
      }
    }
  };

  updateAllproblemRating = async (req, res) => {
    const problems = await this.getLatestProblemsWithRatings();
    let flag = true;
    if (problems.length > 0) {
      problems.forEach(async (problem) => {
        const userActivity = await this.getUserRatingsAndAttemptsByProblem(
          problem.id
        );

        //console.log(userActivity);
        if (userActivity.length > 0) {
          //console.log(problem.id,problem.rating,userActivity.length);
          let newRating = 0;
          let sum = 0;
          userActivity.forEach((activity) => {
            const userRating = activity.rating;
            console.log("userRating", userRating);
            let dif = Math.abs(problem.rating - userRating);
            const wa = activity.failed_submissions;
            const duration = activity.duration;
            console.log("wa and duration and dif", wa, duration, dif);
            let cur =
              0.3 * (800 + wa * 50) + 0.7 * (800 + Math.max(duration - 10, 0));
            console.log("cur", cur);
            //cur=(3500.0-800.0) / (1.0 + Math.exp(-0.1 *cur))+800.0;
            if (cur < 800.0) {
              cur = 800.0;
            }
            if (cur > 3500.0) {
              cur = 3500.0;
            }

            dif = 4000 - dif;
            console.log("rating difference and cur", dif, cur);
            sum += dif;
            newRating += dif * cur;
          });
          if (sum != 0) {
            newRating /= sum;
            newRating = Math.round(newRating);
            console.log(problem.id, problem.rating, newRating);
            const res = await ratingRepository.updateProblemRating(
              problem.id,
              newRating,
              new Date()
            );
            if (!res.success) flag = false;
          }
        }
      });
    }
    // problems.forEach(async (problem)=>{
    //     console.log(problem.id,problem.rating);
    // }
    // )
    console.log(flag);
    if (flag) {
      res.status(202).json({ message: "Rating updated successfully" });
    } else {
      res.status(500).json({ message: "Rating update failed" });
    }
  };

  // contest affecting user rating...............................

  getAllContestParticipants = async (contestId) => {
    const result = await ratingRepository.getAllContestParticipants(contestId);
    if (result.success) {
      return result.data;
    } else {
      return [];
    }
  };

  getAllContestParticipantWithRating = async (contestId) => {
    const result = await ratingRepository.getAllContestParticipantWithRating(
      contestId
    );
    if (result.success) {
      return result.data;
    } else {
      return [];
    }
  };

  changeUserRatings = async (req, res) => {
    // mark contest as finished
    const contestId = req.params.contestId;
    const participants = await this.getAllContestParticipants(contestId);
    console.log(participants);
    const participantsWithRating =
      await this.getAllContestParticipantWithRating(contestId);
    const defaultPlace = participantsWithRating.length / 2 + 1;
    const defaultPlaceHolder =
      participants.length - participantsWithRating.length;
    const LeaderBoard = await contestRepository.getLeaderboard(contestId);
    let flag = true;
    if (participants.length > 0) {
      participants.forEach(async (participant) => {
        const haveRating = participantsWithRating.find(
          (p) => p.userId === participant.userId
        );
        let place;
        if (haveRating) {
          place =
            participantsWithRating.findIndex(
              (p) => p.userId === participant.userId
            ) + 1;
          if (place >= defaultPlace) {
            place = defaultPlaceHolder + place;
          }
        } else {
          place = defaultPlace;
        }

        let contestPlace =
          LeaderBoard.data.findIndex((p) => p.id === participant.userId) + 1;
        //get the user current rating....................
        let res = await ratingRepository.getCurrentRating(participant.userId);
        let rating;
        if (res.data.length == 0) rating = 800;
        else rating = res.data[0].rating;

        //contestPlace is the rank
        //rating is the prevRating
        let prevRating = rating;
        let change = 10 * (place - contestPlace);
        rating = rating + change;

        ratingRepository.updateRating(
          participant.userId,
          contestId,
          rating,
          prevRating,
          change,
          contestPlace
        );
      });
    }
    if (flag) {
      res.status(202).json({ message: "Rating updated successfully" });
    } else {
      res.status(500).json({ message: "Rating update failed" });
    }
  };
}
module.exports = RatingController;
