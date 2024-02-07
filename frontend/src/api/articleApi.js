// import Api from "./base";

// class CanvasApi extends Api {
//   getAllCanvas = async () => {
//     return await this.get("/canvases");
//   };
//   getCanvasById = async (id) => {
//     return await this.get("/canvases/" + id);
//   };
//   updateCanvas = async (id, data) => {
//     return await this.put("/canvases/" + id, data);
//   };
//   createCanvas = async (name) => {
//     return await this.post("/canvases/", { name: name });
//   };
// }
// export default CanvasApi;

import Api from "./base";

class ArticleApi extends Api {
  getAllArticles = async () => {
    console.log("/articles");
    return await this.get("/articles");
  };
  getArticlesBySeries = async (id) => {
    return await this.get("/series/" + id + "/articles");
  };
  getArticleById = async (id) => {
    return await this.get("/articles/" + id);
  };
  updateArticle = async (id, data) => {
    return await this.put("/articles/" + id, data);
  };
  createArticle = async (title) => {
    return await this.post("/articles/", { title });
  };
  deleteArticle = async (id) => {
    return await this.delete("/articles/" + id);
  };
  getLiveArticles = async () => {
    return await this.get("/articles/live");
  };
}

export default ArticleApi;
