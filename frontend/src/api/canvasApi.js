import Api from "./base";

class CanvasApi extends Api {
  getAllCanvas = async () => {
    return await this.get("/canvas");
  };
}
export default CanvasApi;
