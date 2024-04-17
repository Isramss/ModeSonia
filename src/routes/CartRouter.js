import Router from "express";
import {
  addToCart,
  getCartItems,
  removeItemFromCart,
} from "../controllers/CartController";

const cartRoute = Router();

cartRoute.get("/:userId", getCartItems);
cartRoute.post("/:articleId/add/:userId", addToCart);
cartRoute.delete("/:userId/remove/:articleId", removeItemFromCart);

export default cartRoute;
