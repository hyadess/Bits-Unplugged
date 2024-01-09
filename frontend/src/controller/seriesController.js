import SeriesApi from "../api/seriesApi";
import Controller from "./base";

class SeriesController extends Controller {
  seriesApi = new SeriesApi();
  getAllSeries = async () => {
    const res = await this.seriesApi.getAllSeries();
    return res;
  };
  getSeriesByTopic = async (topicId) => {
    const res = await this.seriesApi.getSeriesByTopic(topicId);
    return res;
  };
  getSeriesById = async (seriesId) => {
    const res = await this.seriesApi.getSeriesById(seriesId);
    return res;
  };
  updateSeries = async (id, data) => {
    const res = await this.seriesApi.updateSeries(id, data);
    return res;
  };
  getAllProblems = async (seriesId) => {
    const res = await this.seriesApi.getAllProblems(seriesId);
    return res;
  };

  addSeries = async (name) => {
    const res = await this.seriesApi.addSeries(name);
    return res;
  };
}
export default SeriesController;
