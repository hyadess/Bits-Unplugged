const SubmissionRepository = require("./submissionRepository");
const SeriesRepository = require("./seriesRepository");

const submissionRepository = new SubmissionRepository();
const seriesRepository = new SeriesRepository();

module.exports = { submissionRepository, seriesRepository };
