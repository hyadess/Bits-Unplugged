import CanvasApi from "../api/canvasApi";
import Controller from "./base";

class CanvasController extends Controller {
  canvasApi = new CanvasApi();
  getAllCanvas = async () => {
    const res = await this.canvasApi.getAllCanvas();
    return res;
  };
  // Todo: Get Canvas by Id
}
export default CanvasController;
