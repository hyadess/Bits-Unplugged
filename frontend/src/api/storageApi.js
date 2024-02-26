import Api from "./base";

class StorageApi extends Api {
  upload = async (data) => {
    return await this.post("/storage/upload", data);
  };
  trimmedUpload = async (data) => {
    return await this.post("/storage/upload/trimmed", data);
  };
  remove = async (path) => {
    return await this.post("/storage/delete", { path });
  };
}
export default StorageApi;
