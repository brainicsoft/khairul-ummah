import type { RequestHandler } from "express"
import { sendResponse } from "../../utils/sendResponse"
import { catchAsync } from "../../utils/catchAsync"
import {
  createPaymentService,
  getAllPaymentService,
  getPaymentByIdService,
  updatePaymentByIdService,
  deletePaymentByIdService,
  verifyBkashPaymentService,
  getPaymentSummaryService,
  processSslcommerzIPNService,
  getPaymentStatusService,
  handleSslSuccessService,
  handleSslCancelService,
} from "./payment.service"

export const createPaymentController: RequestHandler = catchAsync(async (req, res) => {
  const result = await createPaymentService(req.body)
  sendResponse(res, {
    status: 201,
    success: true,
    message: "Successfully created payment",
    data: result,
  })
})

export const verifyBkashController: RequestHandler = catchAsync(async (req, res) => {
  const result = await verifyBkashPaymentService(req.query)

  if (result.success) {
    const redirectUrl = new URL("http://localhost:3000/payment-status")
    redirectUrl.searchParams.append("paymentId", req.query.paymentID as string)
    redirectUrl.searchParams.append("trxID", result.trxID)
    redirectUrl.searchParams.append("amount", result.amount?.toString() || "0")

    return res.redirect(redirectUrl.toString())
  } else {
    const redirectUrl = new URL("http://localhost:3000/payment-status")
    redirectUrl.searchParams.append("paymentId", req.query.paymentID as string)
    redirectUrl.searchParams.append("status", "failed")
    redirectUrl.searchParams.append("message", result.message)

    return res.redirect(redirectUrl.toString())
  }
})

export const sslcommerzSuccessController: RequestHandler = catchAsync(async (req, res) => {
  console.log("[v0] SSLCommerz Success Callback - req.body:", req.body)
  // POST body or GET query থেকে data নাও
  const tran_id = req.body.tran_id || req.query.tran_id;
  const val_id = req.body.val_id || req.query.val_id;

  console.log("[v0] SSLCommerz Success Callback - tran_id:", tran_id, "val_id:", val_id);

  if (!tran_id) {
    // tran_id missing হলে browser redirect
    return res.redirect(
      "http://localhost:3000/payment-status?status=failed&message=Transaction%20ID%20missing"
    );
  }

  try {
    // Validate payment with SSLCommerz if val_id exists
    if (val_id) {
      await processSslcommerzIPNService({
        tran_id,
        val_id,
        status: "VALID",
      });
    }

    const result = await handleSslSuccessService(tran_id as string);

    if (result.success) {
      const redirectUrl = new URL("http://localhost:3000/payment-status");
      redirectUrl.searchParams.append("tran_id", tran_id as string);
      redirectUrl.searchParams.append("val_id", (val_id as string) || "");
      redirectUrl.searchParams.append("status", "success");
      redirectUrl.searchParams.append("amount", result.payment.amount.toString());

      return res.redirect(redirectUrl.toString());
    } else {
      return res.redirect(
        `http://localhost:3000/payment-status?status=failed&message=${encodeURIComponent(result.message)}`
      );
    }
  } catch (error) {
    console.error("[v0] SSLCommerz Success Error:", error);
    return res.redirect(
      "http://localhost:3000/payment-status?status=error&message=Payment%20processing%20error"
    );
  }
});

export const sslcommerzCancelController: RequestHandler = catchAsync(async (req, res) => {
  const { tran_id } = req.query

  console.log("[v0] SSLCommerz Cancel Callback - tran_id:", tran_id)

  if (tran_id) {
    await handleSslCancelService(tran_id as string)
  }

  return res.redirect(
    `http://localhost:3000/payment-status?status=cancelled&message=Payment%20cancelled&tran_id=${tran_id}`,
  )
})

export const sslcommerzIPNController: RequestHandler = catchAsync(async (req, res) => {
  console.log("[v0] SSLCommerz IPN Received:", req.body)

  const result = await processSslcommerzIPNService(req.body)

  // SSLCommerz expects "OK" response for successful IPN processing
  if (result.success) {
    console.log("[v0] IPN processed successfully")
    return res.status(200).send("OK")
  } else {
    console.log("[v0] IPN processing failed:", result.message)
    return res.status(400).send("FAILED")
  }
})

export const getPaymentStatusController: RequestHandler = catchAsync(async (req, res) => {
  const result = await getPaymentStatusService(req.params.id)
  sendResponse(res, {
    status: 200,
    success: true,
    message: "Payment status retrieved successfully",
    data: result,
  })
})

export const getAllPaymentController: RequestHandler = catchAsync(async (req, res) => {
  const { result, meta } = await getAllPaymentService(req.query)
  sendResponse(res, {
    status: 200,
    success: true,
    message: "Payments retrieved successfully",
    data: result,
    meta: meta,
  })
})

export const getPaymentByIdController: RequestHandler = catchAsync(async (req, res) => {
  const result = await getPaymentByIdService(req.params.id)
  sendResponse(res, {
    status: 200,
    success: true,
    message: "Payment retrieved successfully",
    data: result,
  })
})

export const updatePaymentByIdController: RequestHandler = catchAsync(async (req, res) => {
  const result = await updatePaymentByIdService(req.params.id, req.body)
  sendResponse(res, {
    status: 200,
    success: true,
    message: "Payment updated successfully",
    data: result,
  })
})

export const deletePaymentByIdController: RequestHandler = catchAsync(async (req, res) => {
  const result = await deletePaymentByIdService(req.params.id)
  sendResponse(res, {
    status: 200,
    success: true,
    message: "Payment deleted successfully",
    data: result,
  })
})

export const getPaymentSummaryController: RequestHandler = catchAsync(async (req, res) => {
  const summary = await getPaymentSummaryService()

  sendResponse(res, {
    status: 200,
    success: true,
    message: "Payment summary fetched successfully",
    data: summary,
  })
})
