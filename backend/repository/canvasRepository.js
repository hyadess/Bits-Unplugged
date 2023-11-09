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
      INSERT INTO Canvas (name, classname, info, logo)
      VALUES ($1, $2, $3, $4);
    `;
    const params = [data.name, data.classname, data.info, data.logo];
    const result = await this.query(query, params);
    return result;
  };
  updateCanvas = async (canvas_id, data) => {
    // First Update to Canvas Table
    const query = `
      UPDATE Canvas
      SET name = $2, classname = $3, info = $4, logo = $5
      WHERE canvas_id = $1;
    `;
    const params = [canvas_id, data.name, data.classname, data.info, data.logo];
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
