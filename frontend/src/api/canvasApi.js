import Api from "./base";

class CanvasApi extends Api {
  getAllCanvas = async () => {
    return await this.get("/canvas");
  };
  getCanvasById = async (id) => {
    return await this.get("/canvas/" + id);
  };
  updateCanvas = async (id, data) => {
    return await this.put("/canvas/" + id, { canvas: data });
  };
  addCanvas = async (name) => {
    return await this.post("/canvas/", { name: name });
  };
}
export default CanvasApi;
