const Repository = require("./base");
const db = require("../models/index");
const { Op } = require("sequelize");

class ArticleRepository extends Repository {
  constructor() {
    super();
  }

  getAllArticles = async () => {
    return await db.Article.findAll();
  };

  getSubmittedArticles = async () => {
    return await db.Article.findAll({
      where: {
        approvalStatus: {
          [Op.or]: ["pending", "approved"],
        },
      },
      include: [
        {
          model: db.User,
          as: "setter",
        },
      ],
    });
  };

  getMyArticles = async (setterId) => {
    return await db.Article.findAll({
      where: {
        setterId,
      },
      order: [["createdAt", "DESC"]],
    });
  };

  getArticlesBySeries = async (seriesId) => {
    return await db.Article.findAll({
      where: {
        seriesId,
      },
    });
  };

  getLiveArticlesBySeries = async (seriesId) => {
    return await db.Article.findAll({
      where: {
        seriesId,
        isLive: true,
        approvalStatus: "approved",
      },
    });
  };

  getLiveArticles = async () => {
    return await db.Article.findAll({
      where: {
        isLive: true,
        approvalStatus: "approved",
      },
    });
  };

  getArticleById = async (id) => {
    return await db.Article.findByPk(id);
  };

  createArticle = async (setterId, data) => {
    return await db.Article.create({ setterId, ...data });
  };

  updateArticle = async (id, data) => {
    console.log("Update: ", id, data);
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

  updateArticlesBySeries = async (seriesId, data) => {
    const transaction = await db.sequelize.transaction();
    try {
      // find all articles by seriesId
      const existingArticles = await db.Article.findAll({
        where: {
          seriesId,
        },
        transaction,
      });

      const existingArticleIds = existingArticles.map((article) => article.id);
      const dataArticleIds = data.map((article) => article.id);
      const articlesToDelete = existingArticleIds.filter(
        (id) => !dataArticleIds.includes(id)
      );
      const articlesToUpdate = existingArticleIds.filter((id) =>
        dataArticleIds.includes(id)
      );
      const articlesToCreate = dataArticleIds.filter(
        (id) => !existingArticleIds.includes(id)
      );
      const deletedArticles = await db.Article.update(
        { seriesId: null },
        {
          returning: true,
          where: {
            id: articlesToDelete,
          },
          transaction,
        }
      );

      console.log(articlesToUpdate);
      for (const article of data) {
        const recordToUpdate = await db.Article.update(article, {
          returning: true,
          where: {
            id: article.id,
          },
        });
      }
      // const createdArticles = await db.Article.bulkCreate(data, {
      //   transaction,
      // });
      await transaction.commit();
      return { success: true };
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  };
}

module.exports = new ArticleRepository();
