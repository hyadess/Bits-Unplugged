const Controller = require("./base");
const CanvasRepository = require("../repositories/canvasRepository");
const canvasRepository = new CanvasRepository();
class CanvasController extends Controller {
  constructor() {
    super();
  }
  getAllCanvases = async (req, res) => {
    this.handleRequest(res, async () => {
      const canvases = await canvasRepository.getAllCanvases();
      res.status(200).json(canvases);
    });
  };
  getCanvasById = async (req, res) => {
    this.handleRequest(res, async () => {
      const canvas = await canvasRepository.getCanvasById(req.params.id);
      if (!canvas) {
        res.status(404).json({ error: "Canvas not found" });
      } else {
        res.status(200).json(canvas);
      }
    });
  };
  createCanvas = async (req, res) => {
    this.handleRequest(res, async () => {
      const newCanvas = await canvasRepository.createCanvas(req.body);
      res.status(201).json(newCanvas);
    });
  };
  updateCanvas = async (req, res) => {
    this.handleRequest(res, async () => {
      const updatedCanvas = await canvasRepository.updateCanvas(
        req.params.id,
        req.body
      );
      if (!updatedCanvas) {
        res.status(404).json({ error: "Canvas not found" });
      } else {
        res.status(200).json(updatedCanvas);
      }
    });
  };
  deleteCanvas = async (req, res) => {
    this.handleRequest(res, async () => {
      const deletedCanvas = await canvasRepository.deleteCanvas(req.params.id);
      if (!deletedCanvas) {
        res.status(404).json({ error: "Canvas not found" });
      } else {
        res.status(200).json({ message: "Canvas deleted successfully" });
      }
    });
  };
}

module.exports = CanvasController;
