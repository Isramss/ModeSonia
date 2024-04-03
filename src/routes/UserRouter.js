import { Router } from "express";
import {
  deleteUser,
  inscription,
  listUsers,
  login,
} from "../controllers/UserController";
const authRoute = Router();

authRoute.get("/", listUsers);
authRoute.post("/inscription", inscription);
authRoute.post("/login", login);

authRoute.delete("/delete/:id", deleteUser);

// avec authentification Admin pour ajouter /modifier / et supprimer des users

// authRoute.post("/inscription", auth, inscription);

export default authRoute;
