const Repository = require("./base");
const db = require("../models/index");

class ArticleRepository extends Repository {
  constructor() {
    super();
  }

  getAllArticles = async () => {
    return await db.Article.findAll();
  };

  getLiveArticles = async () => {
    return await db.Article.findAll({
      where: {
        isLive: true,
      },
    });
  };

  getArticleById = async (id) => {
    return await db.Article.findByPk(id);
  };

  createArticle = async (data) => {
    return await db.Article.create(data);
  };

  updateArticle = async (id, data) => {
    const [updatedRowsCount, [updatedArticle]] = await db.Article.update(data, {
      returning: true,
      where: {
        id,
      },
    });

    if (updatedRowsCount === 0) {
      return null; // Handle the case where the article does not exist or no rows were updated
    }

    return updatedArticle;
  };

  deleteArticle = async (articleId) => {
    const deletedArticle = await db.Article.destroy({
      where: {
        id: articleId,
      },
      returning: true,
    });

    if (deletedArticle === 0) {
      return null; // Handle the case where the article does not exist or no rows were deleted
    }

    return deletedArticle;
  };

  makeArticleLive = async (articleId) => {
    const [updatedRowsCount, [updatedArticle]] = await db.Article.update(
      { isLive: true },
      {
        returning: true,
        where: {
          id: articleId,
        },
      }
    );

    if (updatedRowsCount === 0) {
      return null; // Handle the case where the article does not exist or no rows were updated
    }

    return updatedArticle;
  };
}
