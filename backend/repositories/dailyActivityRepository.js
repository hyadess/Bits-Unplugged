const Repository = require('./base');
const db = require('../models/index');
const { Op } = require('sequelize');

class DailyActivityRepository extends Repository {
  constructor() {
    super();
  }
  Entry = async (userId,problemId,duration) => {
    const today = new Date();
    const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    const dailyActivity = db.DailyActivity.create({
        userId:userId,
        problemId:problemId,
        activityDate:today,
        duration:duration,
      });
    return dailyActivity;
  };
  getDaywiseActivityByUser = async (userId) => {
    const query = `
      SELECT
      "D"."userId",
      "D"."activityDate"::DATE AS "visitDate",
      SUM("D"."duration") AS "totalDuration"
      FROM
      "DailyActivities" "D"
      WHERE
      "D"."userId" = $1
      GROUP BY
      "D"."userId","visitDate"
      ORDER BY
      "D"."userId","visitDate";
      `;
    const params = [userId];
    const result = await this.query(query, params);
    return result;
  };
  recentlyViewedProblems = async (userId) => {
    const query = `
      SELECT
      "D"."problemId",
      "PV"."title",
      "PV"."rating",
      "A"."isSolved",
      "D"."activityDate",
      "D"."duration"
      FROM
      "DailyActivities" "D"
      JOIN
      "ProblemVersions" "PV" ON "D"."problemId" = "PV"."id"
      JOIN 
      "Activities" "A" ON "D"."problemId" = "A"."problemId"
      JOIN
      (
        SELECT 
            "problemId", 
            MAX("activityDate") AS "maxDate"
        FROM 
            "DailyActivities"
        WHERE 
            "userId" = $1
        GROUP BY 
            "problemId"
      ) "SUBQ" ON "D"."problemId" = "SUBQ"."problemId" AND "D"."activityDate" = "SUBQ"."maxDate"
      WHERE
      "D"."userId" = $1 AND "PV"."isLive" = TRUE
      ORDER BY
      "D"."activityDate" DESC;
      `;
    const params = [userId];
    const result = await this.query(query, params);
    return result;
  };

  getDaywiseActivityByUserAndSeries = async (userId,seriesId) => {
    const query = `
      SELECT
      "D"."userId",
      "S"."id" AS "seriesId",
      "D"."activityDate"::DATE AS "visitDate",
      SUM("D"."duration") AS "totalDuration"
      FROM
      "DailyActivities" "D"
      JOIN
      "ProblemVersions" "PV" ON "D"."problemId" = "PV"."id"
      JOIN 
      "Series" "S" ON "PV"."seriesId" = "S"."id"
      WHERE
      "D"."userId" = $1 AND "PV"."seriesId" = $2
      GROUP BY
      "D"."userId","visitDate"
      ORDER BY
      "D"."userId","visitDate";
      `;
    const params = [userId,seriesId];
    const result = await this.query(query, params);
    return result;
  };

    
}
module.exports = DailyActivityRepository;