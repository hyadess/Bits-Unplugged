import Api from "./base";

class StorageApi extends Api {
  upload = async (data) => {
    return await this.post("/storage/upload", data);
  };
  remove = async (path) => {
    return await this.post("/storage/delete", { path });
  };
}
export default StorageApi;