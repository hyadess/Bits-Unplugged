const Controller = require('./base');

const DailyActivityRepository = require('../repositories/dailyActivityRepository');
const dailyActivityRepository = new DailyActivityRepository();

class dailyActivityController extends Controller {
  constructor() {
    super();
  }
  daywiseActivityByUser = async (req, res) => {
    
    const result = await dailyActivityRepository.getDaywiseActivityByUser(req.params.username);
    if(result.success){
      res.status(200).json(result.data);
    }else{
      res.status(404).json(result);
    }
  };

  recentlyViewedProblems = async (req, res) => {
    const userId = req.user.userId;
    const result = await dailyActivityRepository.recentlyViewedProblems(userId);
    if(result.success){
      res.status(200).json(result.data);
    }else{
      res.status(404).json(result);
    }
  };

}
module.exports = dailyActivityController;