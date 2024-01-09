const Controller = require("./base");
const SeriesRepository = require("../repository/seriesRepository");
const seriesRepository = new SeriesRepository();
class SeriesController extends Controller {
  constructor() {
    super();
  }

  getAllSeries = async (req, res) => {
    let result = await seriesRepository.getAllSeries();
    this.handleResponse(result, res);
  };

  getSeriesByTopic = async (req, res) => {
    let result = await seriesRepository.getSeriesByTopic(req.params.topicId);
    this.handleResponse(result, res);
  };
  getSeriesById = async (req, res) => {
    let result = await seriesRepository.getSeriesById(req.params.seriesId);
    this.handleResponse(result, res);
  };
  addSeries = async (req, res) => {
    let result = await seriesRepository.addSeries(req.body);
    this.handleResponse(result, res);
  };
  updateSeries = async (req, res) => {
    let result = await seriesRepository.updateSeries(
      req.params.seriesId,
      req.body.series
    );
    this.handleResponse(result, res);
  };
  deleteSeries = async (req, res) => {
    let result = await seriesRepository.deleteSeries(req.params.seriesId);
    this.handleResponse(result, res);
  };
  getAllProblems = async (req, res) => {
    let result = await seriesRepository.getAllProblems(req.params.seriesId);
    this.handleResponse(result, res);
  };
  // assignSeries
  // deleteProblemSerial = async (req, res) => {
  //   let result = await seriesRepository.deleteProblemSerial(
  //     req.params.problemId
  //   );
  //   this.handleResponse(result, res);
  // };
  // setProblemSerial = async (req, res) => {
  //   let result = await seriesRepository.setProblemSerial(req.params.problemId,req.params.seriesId,);
  //   this.handleResponse(result, res);
  // };
}

module.exports = SeriesController;
