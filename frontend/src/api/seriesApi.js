import Api from "./base";

class SeriesApi extends Api {
  getAllSeriess = async () => {
    return await this.get("/series");
  };
  getSeriessByTopic = async (topic_id) => {
    return await this.get("/series/by_topic/" + topic_id);
  };
  getSeriessById = async (series_id) => {
    return await this.get("/series/" + series_id);
  };
}
export default SeriesApi;
