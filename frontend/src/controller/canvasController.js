import CanvasApi from "../api/canvasApi";
import Controller from "./base";

class CanvasController extends Controller {
  canvasApi = new CanvasApi();
  getAllCanvas = async () => {
    const res = await this.canvasApi.getAllCanvas();
    return res;
  };
  // Todo: Get Canvas by Id
  getCanvasById = async (id) => {
    const res = await this.canvasApi.getCanvasById(id);
    return res;
  };
  updateCanvas = async (id, data) => {
    const res = await this.canvasApi.updateCanvas(id, data);
    return res;
  };

  createCanvas = async (name) => {
    const res = await this.canvasApi.createCanvas(name);
    return res;
  };
}
export default CanvasController;
