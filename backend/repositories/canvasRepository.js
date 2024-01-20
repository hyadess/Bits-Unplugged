const Repository = require("./base");
const db = require("../models/index");

class CanvasRepository extends Repository {
  constructor() {
    super();
  }

  getAllCanvases = async () => {
    return await db.Canvas.findAll();
  };

  getCanvasById = async (id) => {
    return await db.Canvas.findByPk(id);
  };

  createCanvas = async (data) => {
    return await db.Canvas.create(data);
  };

  updateCanvas = async (id, data) => {
    const [updatedRowsCount, [updatedCanvas]] = await db.Canvas.update(data, {
      returning: true,
      where: {
        id,
      },
    });

    if (updatedRowsCount === 0) {
      return null; // Handle the case where the canvas does not exist or no rows were updated
    }

    return updatedCanvas;
  };

  deleteCanvas = async (canvasId) => {
    const deletedCanvas = await db.Canvas.destroy({
      where: {
        id: canvasId,
      },
      returning: true,
    });

    if (deletedCanvas === 0) {
      return null; // Handle the case where the canvas does not exist or no rows were deleted
    }

    return deletedCanvas;
  };
}

module.exports = CanvasRepository;
