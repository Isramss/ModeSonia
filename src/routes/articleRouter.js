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
  auth,
  // uploadImageArticle.single("imageURL"),
  creatArticle
);
articleRoute.put("/update/:id", auth, updateArticle);
articleRoute.delete("/delete/:id", auth, deleteArticle);

export default articleRoute;
