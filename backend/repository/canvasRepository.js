const Repository = require("./base");

class CanvasRepository extends Repository {
  constructor() {
    super();
  }
  getAllCanvas = async () => {
    const query = `
    SELECT * FROM Canvas;
    `;
    const params = [];
    const result = await this.query(query, params);
    return result;
  };
  getCanvasById = async (canvas_id) => {
    const query = `
      SELECT * FROM Canvas
      WHERE canvas_id = $1;
    `;
    const params = [canvas_id];
    const result = await this.query(query, params);
    return result;
  };
  addCanvas = async (data) => {
    const query = `
      INSERT INTO Canvas (name)
      VALUES ($1)
      RETURNING canvas_id;
    `;
    const params = [data.name];
    const result = await this.query(query, params);
    return result;
  };
  updateCanvas = async (canvas_id, data) => {
    // First Update to Canvas Table
    console.log(canvas_id);
    const query = `
      UPDATE Canvas
      SET name = $2, classname = $3, info = $4, logo = $5, params = $6, ui_params = $7, control_params = $8, template = $9
      WHERE canvas_id = $1;
    `;
    const params = [
      canvas_id,
      data.name,
      data.classname,
      data.info,
      data.logo,
      data.params,
      data.ui_params,
      data.control_params,
      data.template,
    ];
    const result = await this.query(query, params);
    return result;
  };
  deleteCanvas = async (canvas_id) => {
    const query = `
      DELETE FROM Canvas
      WHERE canvas_id = $1;
    `;
    const params = [canvas_id];
    const result = await this.query(query, params);
    return result;
  };
}

module.exports = CanvasRepository;
