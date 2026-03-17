import type { RequestHandler } from "express";
import { sendResponse } from "../../utils/sendResponse";
import { catchAsync } from "../../utils/catchAsync";
import {
  createAutopay,
  extendAutopay,
  refundAutopay,
  listAutopays,
  getAutopayById,
  cancelAutopay,
  findAutopayByRequestId,
  getAutopaySchedule,
  getAutopayPaymentById,
  getPaymentsBySubscriptionId,
} from "./autopay.service";

export const createAutopayController: RequestHandler = catchAsync(async (req, res) => {
  const result = await createAutopay(req.body);
  sendResponse(res, { status: 201, success: true, message: "Successfully created recurring payment", data: result });
});

export const extendAutopayController: RequestHandler = catchAsync(async (req, res) => {
  const result = await extendAutopay(req.body);
  sendResponse(res, { status: 200, success: true, message: "Subscription extended", data: result });
});

export const refundAutopayController: RequestHandler = catchAsync(async (req, res) => {
  const result = await refundAutopay(req.body);
  sendResponse(res, { status: 200, success: true, message: "Refund processed", data: result });
});

export const listAutopaysController: RequestHandler = catchAsync(async (req, res) => {
  const page = Number(req.params.page) || 0;
  const size = Number(req.params.size) || 10;
  const result = await listAutopays(page, size);
  sendResponse(res, { status: 200, success: true, message: "Subscriptions fetched", data: result });
});

export const getAutopayByIdController: RequestHandler = catchAsync(async (req, res) => {
  const id = Number(req.params.id);
  const result = await getAutopayById(id);
  sendResponse(res, { status: 200, success: true, message: "Subscription fetched", data: result });
});

export const cancelAutopayController: RequestHandler = catchAsync(async (req, res) => {
  const id = Number(req.params.id);
  const reason = String(req.query.reason || "user_request");
  const result = await cancelAutopay(id, reason);
  sendResponse(res, { status: 200, success: true, message: "Subscription cancelled", data: result });
});

export const findAutopayByRequestIdController: RequestHandler = catchAsync(async (req, res) => {
  const requestId = String(req.params.requestId);
  const result = await findAutopayByRequestId(requestId);
  sendResponse(res, { status: 200, success: true, message: "Subscription fetched by requestId", data: result });
});

export const getAutopayScheduleController: RequestHandler = catchAsync(async (req, res) => {
  const { frequency, startDate, expiryDate } = req.query as Record<string, string>;
  const result = await getAutopaySchedule(frequency, startDate, expiryDate);
  sendResponse(res, { status: 200, success: true, message: "Schedule generated", data: result });
});

export const getAutopayPaymentByIdController: RequestHandler = catchAsync(async (req, res) => {
  const id = Number(req.params.id);
  const result = await getAutopayPaymentById(id);
  sendResponse(res, { status: 200, success: true, message: "Payment fetched", data: result });
});

export const getPaymentsBySubscriptionIdController: RequestHandler = catchAsync(async (req, res) => {
  const subscriptionId = Number(req.params.subscriptionId);
  const result = await getPaymentsBySubscriptionId(subscriptionId);
  sendResponse(res, { status: 200, success: true, message: "Payments fetched for subscription", data: result });
});

  import { 
   updateAutopayByIdService,
   deleteAutopayByIdService
   } from './autopay.service'; // Update with your service path


 


  // update Autopay 

    export const updateAutopayByIdController: RequestHandler = catchAsync(async (req, res) => {
    const result = await updateAutopayByIdService(req.params.id,req.body);
    sendResponse(res, {
      status: 200,
      success: true,
      message: 'autopay updated successfully',
      data: result,
    });
  });

  // delete Autopay 

    export const deleteAutopayByIdController: RequestHandler = catchAsync(async (req, res) => {
    const result = await deleteAutopayByIdService(req.params.id);
    sendResponse(res, {
      status: 200,
      success: true,
      message: 'autopay deleted successfully',
      data: result,
    });
  });


  