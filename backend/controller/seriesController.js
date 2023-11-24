const Controller = require("./base");
const SeriesRepository = require("../repository/seriesRepository");
const seriesRepository = new SeriesRepository();
class SeriesController extends Controller {
  constructor() {
    super();
  }

  getAllSeriess = async (req, res) => {
    let result = await seriesRepository.getAllSeriess();
    this.handleResponse(result, res);
  };

  getSeriessByTopic = async (req, res) => {
    let result = await seriesRepository.getSeriessByTopic(req.params.topic_id);
    this.handleResponse(result, res);
  };
  getSeriesById = async (req, res) => {
    let result = await seriesRepository.getSeriesById(req.params.series_id);
    this.handleResponse(result, res);
  };
  addSeries = async (req, res) => {
    let result = await seriesRepository.addSeries(req.body);
    this.handleResponse(result, res);
  };
  updateSeries = async (req, res) => {
    let result = await seriesRepository.updateSeries(
      req.params.series_id,
      req.body
    );
    this.handleResponse(result, res);
  };
  deleteSeries = async (req, res) => {
    let result = await seriesRepository.deleteSeries(req.params.series_id);
    this.handleResponse(result, res);
  };
}

module.exports = SeriesController;
