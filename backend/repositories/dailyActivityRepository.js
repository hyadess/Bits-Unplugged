const Repository = require("./base");
const db = require("../models/index");
const { Op } = require("sequelize");

class DailyActivityRepository extends Repository {
  constructor() {
    super();
  }
  Entry = async (userId, problemId, duration, timestamp) => {
    const today = timestamp;
    // const date =
    //   today.getFullYear() +
    //   "-" +
    //   (today.getMonth() + 1) +
    //   "-" +
    //   today.getDate();
    const dailyActivity = db.DailyActivity.create({
      userId: userId,
      problemId: problemId,
      activityDate: today ?? new Date(),
      duration: duration,
    });
    return dailyActivity;
  };
  getDaywiseActivityByUser = async (username) => {
    const query = `
      SELECT
      "D"."userId",
      date_trunc('week', "D"."activityDate")::DATE AS "visitDate",
      SUM("D"."duration") AS "totalDuration"
      FROM
      "DailyActivities" "D"
      JOIN
      "Users" "U" ON "D"."userId" = "U"."id"
      WHERE
      "U"."username" = $1
      AND "D"."activityDate" >= (CURRENT_DATE - INTERVAL '3 months')
      GROUP BY
      "D"."userId","visitDate"
      ORDER BY
      "D"."userId","visitDate";
      `;
    const params = [username];
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
      (
        SELECT
        "DT"."problemId",
        MAX("DT"."activityDate") AS "maxDate"
        FROM
        "DailyActivities" "DT"
        WHERE
        "DT"."userId" = $1
        GROUP BY
        "DT"."problemId"
      ) "X"
      JOIN
      "DailyActivities" "D" ON "X"."problemId" = "D"."problemId" AND "X"."maxDate" = "D"."activityDate"
      JOIN
      "ProblemVersions" "PV" ON "D"."problemId" = "PV"."id"
      JOIN 
      "Activities" "A" ON "D"."problemId" = "A"."problemId" AND "D"."userId" = "A"."userId"
      WHERE
      "D"."userId" = $1 AND "PV"."isLive" = TRUE
      ORDER BY
      "D"."activityDate" DESC
      LIMIT 5;
      `;
    const params = [userId];
    const result = await this.query(query, params);
    return result;
  };

  getDaywiseActivityByUserAndSeries = async (userId, seriesId) => {
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
    const params = [userId, seriesId];
    const result = await this.query(query, params);
    return result;
  };
}
module.exports = DailyActivityRepository;
