import { Router } from "express";
import { requestValidator } from "../../middlewares/requestValidator";
import {
  createAutopayController,

} from "./autopay.controller";
import { autopayValidationSchema } from "./autopay.validation";

export const autopayRoutes: Router = Router();

autopayRoutes.post("/bkash/create", requestValidator(autopayValidationSchema), createAutopayController);
// autopayRoutes.put("/bkash/extend", extendAutopayController);
// autopayRoutes.post("/bkash/refund", refundAutopayController);

// autopayRoutes.get("/subscriptions/:page/:size", listAutopaysController);
// autopayRoutes.get("/subscriptions/:id", getAutopayByIdController);
// autopayRoutes.delete("/subscriptions/:id", cancelAutopayController);
// autopayRoutes.get("/request-id/:requestId", findAutopayByRequestIdController);
// autopayRoutes.get("/schedule", getAutopayScheduleController);
// autopayRoutes.get("/payment/:id", getAutopayPaymentByIdController);
// autopayRoutes.get("/payment/bySubscriptionId/:subscriptionId", getPaymentsBySubscriptionIdController);

export default autopayRoutes;

// // autopay.routes.ts
