import { Router } from "express";
import { auth } from "../middlewares/auth";
import {
  deleteUser,
  inscription,
  listUsers,
  login,
  OneUser,
  updateUsers,
} from "../controllers/UserController";
const authRoute = Router();

authRoute.get("/", auth, listUsers);
authRoute.post("/inscription", inscription);
authRoute.post("/login", login);
authRoute.get("/:id", auth, OneUser);
authRoute.put("/edit/:id", updateUsers);
authRoute.delete("/delete/:id", auth, deleteUser);

// avec authentification Admin pour ajouter /modifier / et supprimer des users

// authRoute.post("/inscription", auth, inscription);

export default authRoute;
