import genericErrorHandler from "../middlewares/generic-error.handler";
import notFoundError from "../middlewares/not-found.handler";

import { userRoute, adminRoute } from "../middlewares/auth.middleware";

import { login, register } from "../controllers/auth.controllers";
import { changeRole } from "../controllers/admin.controllers";
import {
  dashboard,
  getAllUsers,
  refresh_token,
  paginationResults,
  changePassword,
  forgotPassword,
  resetPassword,
} from "../controllers/user.controllers";

import {
  updateArticle,
  createArticle,
  createCategory,
  getAllArticles,
  getArticleById,
  deleteArticle,
} from "../controllers/articles.controllers";

import { Router } from "express";
const router = Router();

//Authentication routes

router.post("/login", login);

router.post("/register", register);

router.post("/changerole", adminRoute, changeRole);

router.get("/dashboard/:id", userRoute, dashboard);

router.get("/getallusers", getAllUsers);

router.get("/refreshtoken", refresh_token);

router.get("/pagination/:page/:limit", paginationResults);

//Password reset routes

router.post("/changepassword", changePassword);

router.post("/forgotpassword", forgotPassword);

router.post("/resetpassword/:userId/:token", resetPassword);

//Articles routes

router.get("/getArticles", getAllArticles);

router.get("/articles/:id", getArticleById);

router.post("/createArticle", createArticle);

router.post("/createCategory", createCategory);

router.put("/articles/:id", updateArticle);

router.delete("/articles/:id", deleteArticle);

//Page not found handlers
router.get("*", notFoundError);
router.post("*", notFoundError);
router.delete("*", notFoundError);
router.put("*", notFoundError);

//Custom error handler
router.use(genericErrorHandler);

export default router;
