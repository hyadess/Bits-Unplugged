const Controller = require("./base");
const CanvasRepository = require("../repository/canvasRepository");
const canvasRepository = new CanvasRepository();
class CanvasController extends Controller {
  constructor() {
    super();
  }
  getAllCanvas = async (req, res) => {
    let result = await canvasRepository.getAllCanvas();
    this.handleResponse(result, res);
  };
  getCanvasById = async (req, res) => {
    let result = await canvasRepository.getCanvasById(req.params.canvas_id);
    this.handleResponse(result, res);
  };
  addCanvas = async (req, res) => {
    let result = await canvasRepository.addCanvas(req.body);
    this.handleResponse(result, res);
  };
  updateCanvas = async (req, res) => {
    let result = await canvasRepository.updateCanvas(
      req.body.canvas_id,
      req.body.canvas
    );
    this.handleResponse(result, res);
  };
  deleteCanvas = async (req, res) => {
    let result = await canvasRepository.deleteCanvas(req.params.canvas_id);
    this.handleResponse(result, res);
  };
}

module.exports = CanvasController;
