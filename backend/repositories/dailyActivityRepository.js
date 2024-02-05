const Repository = require('./base');
const db = require('../models/index');
const { Op } = require('sequelize');

class DailyActivityRepository extends Repository {
  constructor() {
    super();
  }
    todaysEntry = async (userId,duration) => {
        const today = new Date();
        const date = today.toISOString().split('T')[0];
        const dailyActivity = db.DailyActivity.findOne({where:{userId:userId,activityDate:date}}).then(
        function(obj){
            if(obj){
            return obj.update({
                duration: obj.duration + duration,
            });
            }
            return db.DailyActivity.create({
                userId:userId,
                activityDate:date,
                duration:duration,
            });
        }
    );
    return dailyActivity;
    };

    getDailyActivity = async (userId, date) => {
        try {
          const dailyActivity = await db.DailyActivity.findOne({
            where: { userId: userId, activityDate: date },
          });
      
          if (dailyActivity) {
            return dailyActivity.duration;
          } else {
            // If no entry is found, return 0 as the duration
            return 0;
          }
        } catch (error) {
          // Handle any errors that might occur during the database query
          console.error('Error fetching daily activity:', error.message);
          return 0; // Return 0 in case of an error
        }
    };
    getAllDailyActivitiesForLast30Days = async (userId) => {
      const endDate = new Date(); // Current date
      const startDate = new Date();
      startDate.setDate(endDate.getDate() - 29); // 30 days ago
    
      try {
        const dailyActivities = await db.DailyActivity.findAll({
          where: {
            userId: userId,
            activityDate: {
              [Op.between]: [startDate, endDate],
            },
          },
        });
    
        return dailyActivities;
      } catch (error) {
        console.error('Error fetching daily activities for the last 30 days:', error.message);
        return [];
      }
    };

    
}
module.exports = DailyActivityRepository;