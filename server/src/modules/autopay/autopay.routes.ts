import { Router } from "express";
import { requestValidator } from "../../middlewares/requestValidator";
import {
  createAutopayController,
  getAutopayByIdController,
  findAutopayByRequestIdController,
  getPaymentsBySubscriptionIdController,
  getAutopayPaymentByIdController,
  getAutopayScheduleController,
  cancelAutopayController,
  refundAutopayController
} from "./autopay.controller";
import { autopayValidationSchema } from "./autopay.validation";

export const autopayRoutes: Router = Router();

autopayRoutes.post("/bkash/create", requestValidator(autopayValidationSchema), createAutopayController);
// autopayRoutes.put("/bkash/extend", extendAutopayController);
autopayRoutes.post("/bkash/refund", refundAutopayController);

// autopayRoutes.get("/subscriptions/:page/:size", listAutopaysController);
autopayRoutes.get("/bkash/subscriptions/payment/bySubscriptionId/:subscriptionId", getPaymentsBySubscriptionIdController);
autopayRoutes.get("/bkash/subscriptions/:id", getAutopayByIdController);
autopayRoutes.delete("/bkash/subscriptions/:id", cancelAutopayController);
autopayRoutes.get("/bkash/request-id/:requestId", findAutopayByRequestIdController);
autopayRoutes.get("/bkash/schedule", getAutopayScheduleController);
autopayRoutes.get("/bkash/payment/:id", getAutopayPaymentByIdController);
autopayRoutes.get("/bkash/payment/bySubscriptionId/:subscriptionId", getPaymentsBySubscriptionIdController);

export default autopayRoutes;

// // autopay.routes.ts
