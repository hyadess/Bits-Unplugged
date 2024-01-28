const Controller = require("./base");
const SeriesRepository = require("../repositories/seriesRepository");
const { problemRepository } = require("../repositories");
const seriesRepository = new SeriesRepository();
class SeriesController extends Controller {
  constructor() {
    super();
  }

  getAllSeries = async (req, res) => {
    this.handleRequest(res, async () => {
      const series = await seriesRepository.getAllSeries();
      res.status(200).send(series);
    });
  };

  getSeriesByTopic = async (req, res) => {
    this.handleRequest(res, async () => {
      const { topicId } = req.params;
      const series = await seriesRepository.getSeriesByTopic(topicId);
      if (!series) {
        res.status(404).json({ error: "Series not found" });
      } else {
        res.status(200).json(series);
      }
    });
  };
  getSeriesById = async (req, res) => {
    this.handleRequest(res, async () => {
      const { id } = req.params;
      const series = await seriesRepository.getSeriesById(id);
      if (!series) {
        res.status(404).json({ error: "Series not found" });
      } else {
        res.status(200).json(series);
      }
    });
  };
  createSeries = async (req, res) => {
    this.handleRequest(res, async () => {
      const newSeries = await seriesRepository.createSeries(req.body);
      res.status(201).json(newSeries);
    });
  };
  updateSeries = async (req, res) => {
    this.handleRequest(res, async () => {
      const updatedSeries = await seriesRepository.updateSeries(
        req.params.id,
        req.body
      );
      if (!updatedSeries) {
        res.status(404).json({ error: "Series not found" });
      } else {
        res.status(200).json(updatedSeries);
      }
    });
  };
  deleteSeries = async (req, res) => {
    this.handleRequest(res, async () => {
      const deletedSeries = await seriesRepository.deleteSeries(req.params.id);
      if (!deletedSeries) {
        res.status(404).json({ error: "Series not found" });
      } else {
        res.status(200).json({ message: "Series deleted successfully" });
      }
    });
  };
  getAllProblems = async (req, res) => {
    console.log(req.params, req.query);
    this.handleRequest(res, async () => {
      const problems = await seriesRepository.getAllProblems(
        req.user.userId,
        req.params.id,
        {
          isSolved: req.query.solved !== undefined ? req.query.solved : null,
          isLive: req.user.type === 0 ? true : null,
        }
      );
      res.status(200).send(problems);
    });
  };

  updateAllProblems = async (req, res) => {
    this.handleRequest(res, async () => {
      const problems = await problemRepository.updateProblemsBySeries(
        req.params.id,
        req.body
      );
      res.status(200).send({ message: "Problems updated successfully" });
    });
  };

  updateSerial = async (req, res) => {
    this.handleRequest(res, async () => {
      const problems = await seriesRepository.updateSerial(req.body);
      res.status(200).send({ message: "Serial updated successfully" });
    });
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
