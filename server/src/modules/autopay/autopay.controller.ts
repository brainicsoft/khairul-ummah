import type { RequestHandler } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import {
  createAutopay,
  processBkashWebhook,
//   extendAutopay,
//   refundAutopay,
//   listAutopays,
//   getAutopayById,
//   cancelAutopay,
//   findAutopayByRequestId,
//   getAutopaySchedule,
//   getAutopayPaymentById,
//   getPaymentsBySubscriptionId,
} from "./autopay.service";


export const createAutopayController: RequestHandler = catchAsync(async (req, res) => {
  const result = await createAutopay(req.body);
  sendResponse(res, { status: 201, success: true, message: "Successfully created recurring payment", data: result });
});

export const bkashWebHookController: RequestHandler = catchAsync(async (req, res) => {
  // Handle the webhook or redirect callback from bKash
  const subscriptionRequestId = String(
    req.body?.subscriptionRequestId || req.query?.subscriptionRequestId || req.body?.requestId || req.query?.requestId || ""
  );
  if (!subscriptionRequestId) {
    return sendResponse(res, { status: 400, success: false, message: "subscriptionRequestId is required" });
  }

  const {redirectUrl}:any = await processBkashWebhook(subscriptionRequestId,req.query.reference);
  console.log(`Processed bKash webhook for ${subscriptionRequestId}`, { redirectUrl });

  res.redirect(redirectUrl || '');
});