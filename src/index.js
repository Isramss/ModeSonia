import express from "express";
import dotenv from "dotenv";
dotenv.config();

const app = express();

const port = process.env.PORT;

import path from "path";
import cors from "cors";

import mongoose from "mongoose";
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(process.env.MONGODB_URL);
  console.log(`[ DATABASE ] MongoDB connected !!`);
}

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => res.send("Welcome to API ModeSonia !"));

app.listen(port, () =>
  console.log(`[Server] is running on http://localhost:${port}`)
);
