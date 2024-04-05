import Router from "express";
import {
  creatArticle,
  deleteArticle,
  getAllArticles,
  getArticle,
  updateArticle,
} from "../controllers/ArticleController";
import { auth } from "../middlewares/auth";
import uploadImageArticle from "../middlewares/multer";

const articleRoute = Router();

articleRoute.get("/", getAllArticles);
articleRoute.get("/:id", getArticle);
articleRoute.post(
  "/newarticle",
  uploadImageArticle.single("imageURL"),
  creatArticle
);
articleRoute.delete("/delete/:id", deleteArticle);
articleRoute.put("/update/:id", updateArticle);

export default articleRoute;
