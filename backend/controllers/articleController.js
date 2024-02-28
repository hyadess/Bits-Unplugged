const Controller = require("./base");
const articleRepository = require("../repositories/articleRepository");

class ArticleController extends Controller {
  constructor() {
    super();
  }
  getAllArticles = async (req, res) => {
    this.handleRequest(res, async () => {
      const articles =
        req.user.type === 0
          ? null
          : req.user.type === 2
          ? await articleRepository.getSubmittedArticles()
          : await articleRepository.getMyArticles(req.user.userId);
      res.status(200).json(articles);
    });
  };
  getArticleById = async (req, res) => {
    this.handleRequest(res, async () => {
      const article = await articleRepository.getArticleById(req.params.id);
      if (!article) {
        res.status(404).json({ error: "Article not found" });
      } else {
        res.status(200).json(article);
      }
    });
  };
  createArticle = async (req, res) => {
    this.handleRequest(res, async () => {
      const newArticle = await articleRepository.createArticle(
        req.user.userId,
        req.body
      );
      res.status(201).json(newArticle);
    });
  };
  updateArticle = async (req, res) => {
    this.handleRequest(res, async () => {
      const updatedArticle = await articleRepository.updateArticle(
        req.params.id,
        req.body
      );
      if (!updatedArticle) {
        res.status(404).json({ error: "Article not found" });
      } else {
        res.status(200).json(updatedArticle);
      }
    });
  };
  deleteArticle = async (req, res) => {
    this.handleRequest(res, async () => {
      const deletedArticle = await articleRepository.deleteArticle(
        req.params.id
      );
      if (!deletedArticle) {
        res.status(404).json({ error: "Article not found" });
      } else {
        res.status(200).json({ message: "Article deleted successfully" });
      }
    });
  };
  getLiveArticles = async (req, res) => {
    this.handleRequest(res, async () => {
      const articles = await articleRepository.getLiveArticles();
      res.status(200).json(articles);
    });
  };
  getLiveArticlesBySeries = async (req, res) => {
    this.handleRequest(res, async () => {
      const articles = await articleRepository.getLiveArticlesBySeries(
        req.params.seriesId
      );
      res.status(200).json(articles);
    });
  };
  getArticlesBySeries = async (req, res) => {
    this.handleRequest(res, async () => {
      const articles = await articleRepository.getArticlesBySeries(
        req.params.seriesId
      );
      res.status(200).json(articles);
    });
  };
}

module.exports = ArticleController;
