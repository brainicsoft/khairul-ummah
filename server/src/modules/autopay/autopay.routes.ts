import { Router } from 'express';
import { requestValidator } from '../../middlewares/requestValidator';
import {
  createAutopayController,
  getAutopayByIdController,
  getRecurringAmountQueryController,
  verifyBkashRecurringCallbackController,
} from './autopay.controller';
import { autopayValidationSchema } from './autopay.validation';

export const autopayRoutes: Router = Router();

autopayRoutes.post(
  '/bkash/create',
  requestValidator(autopayValidationSchema),
  createAutopayController,
);
autopayRoutes.get('/bkash/callback', verifyBkashRecurringCallbackController);
autopayRoutes.get('/bkash/amount-query', getRecurringAmountQueryController);
autopayRoutes.post('/bkash/amount-query', getRecurringAmountQueryController);
// Query Subscription & Payment after successful callback
autopayRoutes.get('/bkash/request-id/:requestId', getAutopayByIdController);

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
