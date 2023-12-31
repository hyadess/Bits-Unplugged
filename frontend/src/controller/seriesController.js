import SeriesApi from "../api/seriesApi";
import Controller from "./base";

class SeriesController extends Controller {
  seriesApi = new SeriesApi();
  getAllSeries = async () => {
    const res = await this.seriesApi.getAllSeries();
    return res;
  };
  getSeriesByTopic = async (topic_id) => {
    const res = await this.seriesApi.getSeriesByTopic(topic_id);
    return res;
  };
  getSeriesById = async (series_id) => {
    const res = await this.seriesApi.getSeriesById(series_id);
    return res;
  };
  updateSeries = async (id, data) => {
    const res = await this.seriesApi.updateSeries(id, data);
    return res;
  };
  getAllProblems = async (series_id) => {
    const res = await this.seriesApi.getAllProblems(series_id);
    return res;
  };

  addSeries = async (name) => {
    const res = await this.seriesApi.addSeries(name);
    return res;
  };
}
export default SeriesController;
