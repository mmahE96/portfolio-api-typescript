import { RequestHandler } from "express";
import { Article } from "../types/article.type";
import { PrismaClient } from "@prisma/client";
import { prisma } from "../services/user.service";

const createArticle: RequestHandler = async (req, res) => {
  const { title, content, authorEmail, category, slug, description } =
    req.body as any;

  try {
    const article = await prisma.article.create({
      data: {
        title,
        content,
        description,
        author: { connect: { email: authorEmail } },
        slug,
      },
    });
    console.log(article);
    res.status(200).json(article);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getAllArticles: RequestHandler = async (req, res) => {
  try {
    const articles = await prisma.article.findMany();
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json(error);
  }
};

const createCategory : RequestHandler = async (req, res) => {
  const { name } = req.body as any;

  try {
    const category = await prisma.category.create({
      data: {
        name,
      },
    });
    console.log(category);
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json(error);
  }
};


/*

const getArticleById: RequestHandler = async (req, res) => {
  const { id } = req.params as any;

  try {
    const article = await prisma.article.findUnique({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json(article);
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateArticle: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const { title, content, author, category, slug, description } =
    req.body as Article;

  try {
    const article = await prisma.article.update({
      where: {
        id: Number(id),
      },
      data: {
        title,
        content,
        author,
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

  try {
    const article = await prisma.article.delete({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json(article);
  } catch (error) {
    res.status(500).json(error);
  }
};

*/

export {
  getAllArticles,
  //getArticleById,
  //updateArticle,s
  //deleteArticle,
  createArticle,
  createCategory
};