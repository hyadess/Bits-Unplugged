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
    let result = await seriesRepository.getSeriesByTopic(req.params.topic_id);
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
      req.body.series
    );
    this.handleResponse(result, res);
  };
  deleteSeries = async (req, res) => {
    let result = await seriesRepository.deleteSeries(req.params.series_id);
    this.handleResponse(result, res);
  };
}

module.exports = SeriesController;
