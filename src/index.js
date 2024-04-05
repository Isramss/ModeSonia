import express from "express";
import dotenv from "dotenv";
dotenv.config();

const app = express();

const port = process.env.PORT;

import path from "path";
import cors from "cors";

import mongoose from "mongoose";
import authRoute from "./routes/UserRouter";
import { auth } from "./middlewares/auth";
import articleRoute from "./routes/articleRouter";

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(process.env.MONGODB_URL);
  console.log(`[ DATABASE ] MongoDB connected !!`);
}

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Partie URL :

app.get("/", (req, res) => res.send("Welcome to API ModeSonia !"));
app.use(express.static("/uploads"));
app.use("/auth", authRoute);
app.use("/articles", articleRoute);

app.listen(port, () =>
  console.log(`[Server] is running on http://localhost:${port}`)
);
