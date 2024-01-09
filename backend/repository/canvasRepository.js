const Repository = require("./base");

class CanvasRepository extends Repository {
  constructor() {
    super();
  }

  getAllCanvas = async () => {
    const query = `
      SELECT * FROM "Canvases";
    `;
    const params = [];
    const result = await this.query(query, params);
    return result;
  };

  getCanvasById = async (canvasId) => {
    const query = `
      SELECT * FROM "Canvases"
      WHERE "id" = $1;
    `;
    const params = [canvasId];
    const result = await this.query(query, params);
    return result;
  };

  addCanvas = async (data) => {
    const query = `
      INSERT INTO "Canvases" ("name")
      VALUES ($1)
      RETURNING "id";
    `;
    const params = [data.name];
    const result = await this.query(query, params);
    return result;
  };

  updateCanvas = async (canvasId, data) => {
    const query = `
      UPDATE "Canvases"
      SET
        "name" = $2,
        "classname" = $3,
        "info" = $4,
        "logo" = $5,
        "params" = $6,
        "uiParams" = $7,
        "controlParams" = $8,
        "template" = $9
      WHERE "id" = $1;
    `;
    const params = [
      canvasId,
      data.name,
      data.classname,
      data.info,
      data.logo,
      data.params,
      data.uiParams,
      data.controlParams,
      data.template,
    ];
    const result = await this.query(query, params);
    return result;
  };

  deleteCanvas = async (canvasId) => {
    const query = `
      DELETE FROM "Canvases"
      WHERE "id" = $1;
    `;
    const params = [canvasId];
    const result = await this.query(query, params);
    return result;
  };
}

module.exports = CanvasRepository;
