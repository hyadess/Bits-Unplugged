const SubmissionRepository = require("./submissionRepository");
const SeriesRepository = require("./seriesRepository");
const ProblemRepository = require("./problemRepository");

const submissionRepository = new SubmissionRepository();
const seriesRepository = new SeriesRepository();
const problemRepository = new ProblemRepository();

module.exports = { submissionRepository, seriesRepository, problemRepository };
