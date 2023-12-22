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
}
export default SeriesApi;
