import Api from "./base";

class SeriesApi extends Api {
  getAllSeries = async () => {
    return await this.get("/series");
  };
  getSeriesByTopic = async (topic_id) => {
    return await this.get("/series/by_topic/" + topic_id);
  };
  getSeriesById = async (series_id) => {
    return await this.get("/series/" + series_id);
  };
  updateSeries = async (id, data) => {
    return await this.put("/series/" + id, {
      series: data,
    });
  };
  getAllProblems = async (series_id) => {
    return await this.get("/series/" + series_id + "/problems");
  };
  addSeries = async (name) => {
    return await this.post("/series/", { name: name });
  };
}
export default SeriesApi;
