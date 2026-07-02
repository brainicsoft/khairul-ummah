import { Router } from 'express';
import { requestValidator } from '../../middlewares/requestValidator';
import auth from '../../middlewares/auth';
import {
  bkashRecurringWebhookController,
  createAutopayController,
  getAdminAutopaySubscriptionDetailController,
  getAdminAutopaySubscriptionsController,
  getAutopayByIdController,
  getRecurringAmountQueryController,
  updateAutopayStatusByAdminController,
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
autopayRoutes.post('/bkash/webhook', bkashRecurringWebhookController);
autopayRoutes.get('/bkash/amount-query', getRecurringAmountQueryController);
autopayRoutes.post('/bkash/amount-query', getRecurringAmountQueryController);
// Query Subscription & Payment after successful callback
autopayRoutes.get('/bkash/request-id/:requestId', getAutopayByIdController);
autopayRoutes.get(
  '/admin/subscriptions',
  auth('admin', 'subadmin'),
  getAdminAutopaySubscriptionsController,
);
autopayRoutes.get(
  '/admin/subscriptions/:id',
  auth('admin', 'subadmin'),
  getAdminAutopaySubscriptionDetailController,
);
autopayRoutes.patch(
  '/admin/subscriptions/:id/status',
  auth('admin', 'subadmin'),
  updateAutopayStatusByAdminController,
);

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
