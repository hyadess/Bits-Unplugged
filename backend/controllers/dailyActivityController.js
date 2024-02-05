const Controller = require('./base');

const DailyActivityRepository = require('../repositories/dailyActivityRepository');
const dailyActivityRepository = new DailyActivityRepository();

class dailyActivityController extends Controller {
  constructor() {
    super();
  }
  getDailyActivity = async (req, res) => {
    this.handleRequest(res, async () => {
      let activity = await dailyActivityRepository.getDailyActivity(
        req.user.userId,
        req.params.date
      );
      res.status(200).json(activity);
    });
  };
  getAllDailyActivitiesForLast30Days = async (req, res) => {
    this.handleRequest(res, async () => {
      let activities = await dailyActivityRepository.getAllDailyActivitiesForLast30Days(
        req.user.userId
      );
      res.status(200).json(activities);
    });
  };

}
module.exports = dailyActivityController;