import SeriesApi from "../api/seriesApi";
import Controller from "./base";

class SeriesController extends Controller {
  seriesApi = new SeriesApi();
}
export default SeriesController;
