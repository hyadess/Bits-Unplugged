import SeriesApi from "../api/seriesApi";
import Controller from "./base";

class SeriesController extends Controller {
  seriesApi = new SeriesApi();
  getAllSeriess = async () => {
    const res = await this.seriesApi.getAllSeriess();
    return res;
  };
  getSeriessByTopic = async (topic_id) => {
    const res = await this.seriesApi.getSeriessByTopic(topic_id);
    return res;
  };
  getSeriesById = async (series_id) => {
    const res = await this.seriesApi.getSeriesById(series_id);
    return res;
  };
}
export default SeriesController;
