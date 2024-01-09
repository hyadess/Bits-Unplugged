import Api from "./base";

class SeriesApi extends Api {
  getAllSeries = async () => {
    return await this.get("/series");
  };
  getSeriesByTopic = async (topicId) => {
    return await this.get("/series/by_topic/" + topicId);
  };
  getSeriesById = async (seriesId) => {
    return await this.get("/series/" + seriesId);
  };
  updateSeries = async (id, data) => {
    return await this.put("/series/" + id, {
      series: data,
    });
  };
  getAllProblems = async (seriesId) => {
    return await this.get("/series/" + seriesId + "/problems");
  };
  addSeries = async (name) => {
    return await this.post("/series/", { name: name });
  };
}
export default SeriesApi;
