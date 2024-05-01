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
import cartRoute from "./routes/CartRouter";
import paymentRoute from "./paymentRoute";

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(process.env.MONGODB_URL);
  console.log(`[ DATABASE ] MongoDB connected !!`);
}

app.use(
  cors({
    origin: "https://mode-sonia-front.vercel.app",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Partie URL :

app.get("/", (req, res) => res.send("Welcome to API ModeSonia !"));
app.use(express.static("/uploads"));
app.use("/auth", authRoute);
app.use("/payment", paymentRoute);
app.use("/articles", articleRoute);
app.use("/cart", cartRoute);

app.listen(port, () =>
  console.log(`[Server] is running on http://localhost:${port}`)
);
