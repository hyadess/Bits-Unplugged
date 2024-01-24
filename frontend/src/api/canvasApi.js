import Api from "./base";

class CanvasApi extends Api {
  getAllCanvas = async () => {
    return await this.get("/canvases");
  };
  getCanvasById = async (id) => {
    return await this.get("/canvases/" + id);
  };
  updateCanvas = async (id, data) => {
    return await this.put("/canvases/" + id, data);
  };
  createCanvas = async (name) => {
    return await this.post("/canvases/", { name: name });
  };
}
export default CanvasApi;
