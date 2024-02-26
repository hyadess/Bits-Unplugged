const Repository = require("./base");
const db = require("../models/index");
const { Op } = require("sequelize");

class SetterActivityRepository extends Repository {
  constructor() {
    super();
  }

  //here,  the setterId is the userId of the setter...........................................

  setterActivityBySeries = async (setterId) => {
    const query = `
    SELECT "PV"."seriesId" AS "seriesId", "S1"."name" AS "series",
    COUNT("PV"."id") AS "totalProblems"
    FROM "ProblemVersions" "PV" 
    JOIN "Problems" "P" ON "PV"."problemId" = "P"."id"
    JOIN "Series" "S1" ON "PV"."seriesId" = "S1"."id"
    WHERE "P"."setterId" = $1
    GROUP BY "PV"."seriesId","S1"."name"
    `;
    const params = [setterId];
    const result = this.query(query, params);
    return result;
  };

  famousProblemBySetter = async (setterId) => {
    const query = `
    SELECT "PV"."id" AS "problemId","PV"."title" AS "problemTitle", COUNT("S"."id") AS "totalSubmissions"
    FROM "ProblemVersions" "PV"
    JOIN "Problems" "P" ON "PV"."problemId" = "P"."id"
    JOIN "Submissions" "S" ON "PV"."id" = "S"."problemId"
    WHERE "P"."setterId" = $1
    GROUP BY "PV"."id","PV"."title"
    ORDER BY "totalSubmissions" DESC
    LIMIT 5
    ;`;
    const params = [setterId];
    const result = this.query(query, params);
    return result;
  };

  approvalStatusStat = async (setterId) => {
    const query = `
    SELECT "PV"."approvalStatus" AS "approvalStatus", COUNT("PV"."id") AS "totalProblems"
    FROM "ProblemVersions" "PV"
    JOIN "Problems" "P" ON "PV"."problemId" = "P"."id"
    WHERE "P"."setterId" = $1
    GROUP BY "PV"."approvalStatus"
    ;`;
    const params = [setterId];
    const result = this.query(query, params);
    return result;
  };
}

module.exports = SetterActivityRepository;
