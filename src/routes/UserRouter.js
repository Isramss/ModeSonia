import { Router } from "express";
import {
  deleteUser,
  inscription,
  listUsers,
  login,
  OneUser,
  updateUsers,
} from "../controllers/UserController";
const authRoute = Router();

authRoute.get("/", listUsers);
authRoute.post("/inscription", inscription);
authRoute.post("/login", login);
authRoute.put("/edit/:id", updateUsers);
authRoute.delete("/delete/:id", deleteUser);
authRoute.get("/:id", OneUser);

// avec authentification Admin pour ajouter /modifier / et supprimer des users

// authRoute.post("/inscription", auth, inscription);

export default authRoute;
