import CanvasApi from "../api/canvasApi";
import Controller from "./base";

class CanvasController extends Controller {
  canvasApi = new CanvasApi();

}
export default CanvasController;
