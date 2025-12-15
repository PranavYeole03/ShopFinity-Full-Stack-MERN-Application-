import { Router } from "express";
import auth from "../middleware/auth.js";
import {
  CashOnDeliveryController,
  getOrderDetails,
  paymentController,
  webhookStripe,
} from "../controllers/order.controller.js";

const orderRouter = Router();

orderRouter.post("/cash-delivery", auth, CashOnDeliveryController);
orderRouter.post("/checkout", auth, paymentController);
orderRouter.post("/webhook", webhookStripe);
orderRouter.get("/get-list",auth, getOrderDetails);

export default orderRouter;
