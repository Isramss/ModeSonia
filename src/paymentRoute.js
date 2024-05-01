import { Router } from "express";
import { handlePayment } from "./controllers/PaymentController";

const paymentRoute = Router();

paymentRoute.post("/:userId", handlePayment);

export default paymentRoute;
