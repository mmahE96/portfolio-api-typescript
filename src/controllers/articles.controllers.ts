import { RequestHandler } from "express";
import { prisma } from "../services/user.service";
import { Article } from "../types/article.type";

const createArticle: RequestHandler = async (req, res) => {
  const { title, content, authorEmail, category, slug, description } =
    req.body as any;

  const user = await prisma.user.findUnique({
    where: {
      email: authorEmail,
    },
  });

  try {
    const article = await prisma.article.create({
      data: {
        title,
        content,
        description,
        slug,
        author: {
          connect: {
            email: authorEmail,
          },
        },
        category: {
          connect: {
            name: category,
          },
        },
      },
    }); //add new article to user
    await prisma.user.update({
      where: {
        id: user?.id,
      },
      data: {
        articles: {
          connect: {
            id: article.id,
          },
        },
      },
    });

    return res.status(201).json(article);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getAllArticles: RequestHandler = async (req, res) => {
  try {
    const articles = await prisma.article.findMany({
      include: { author: true },
    });
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getAllCategories: RequestHandler = async (req, res) => {
  try {
    const category = await prisma.category.findMany();
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json(error);
  }
};

const createCategory: RequestHandler = async (req, res) => {
  const { name, description } = req.body as any;

  try {
    const category = await prisma.category.create({
      data: {
        name,
        description: description,
      },
    });

    res.status(200).json(category);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getArticleById: RequestHandler = async (req, res) => {
  const { id } = req.params as any;
  const articleId = parseInt(id);

  try {
    const article = await prisma.article.findUnique({
      where: {
        id: articleId,
      },
    });
    res.status(200).json(article);
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateArticle: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const articleId = parseInt(id);
  const { title, content, author, category, slug, description } =
    req.body as Article;

  try {
    const article = await prisma.article.update({
      where: {
        id: articleId,
      },
      data: {
        title,
        content,
        author: {
          connect: {
            email: author.email,
          },
        },
        slug,
        description,
      },
    });
    res.status(200).json(article);
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteArticle: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const articleId = parseInt(id);

  try {
    const article = await prisma.article.delete({
      where: {
        id: articleId,
      },
    });
    res.status(200).json(article);
  } catch (error) {
    res.status(500).json(error);
  }
};

export {
  getAllArticles,
  getArticleById,
  updateArticle,
  deleteArticle,
  createArticle,
  createCategory,
  getAllCategories,
};
