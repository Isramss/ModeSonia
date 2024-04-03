import Router from "express";
import {
  creatArticle,
  deleteArticle,
  getAllArticles,
  getArticle,
  updateArticle,
} from "../controllers/ArticleController";
import { auth } from "../middlewares/auth";

const articleRoute = Router();

articleRoute.get("/", getAllArticles);
articleRoute.get("/:id", getArticle);
articleRoute.post("/newarticle", creatArticle);
articleRoute.delete("/delete/:id", deleteArticle);
articleRoute.post("/update/:id", auth, updateArticle);

export default articleRoute;
