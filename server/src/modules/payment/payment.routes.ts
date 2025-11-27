import { Router } from "express"
import {
  createPaymentController,
  getAllPaymentController,
  getPaymentSummaryController,
  verifyBkashController,
  sslcommerzSuccessController,
  sslcommerzFailController,
  sslcommerzCancelController,
  sslcommerzIPNController,
  getPaymentStatusController,
} from "./payment.controller"

export const paymentRoutes: Router = Router()

// Create payment (bKash or SSLCommerz)
paymentRoutes.post("/create", createPaymentController)

// Get all payments
paymentRoutes.get("/", getAllPaymentController)

// Get payment summary
paymentRoutes.get("/summary", getPaymentSummaryController)

// Get specific payment status
paymentRoutes.get("/:id/status", getPaymentStatusController)

// bKash verification (callback)
paymentRoutes.get("/verify", verifyBkashController)

paymentRoutes.get("/sslcommerz/success", sslcommerzSuccessController)
paymentRoutes.get("/sslcommerz/fail", sslcommerzFailController)
paymentRoutes.get("/sslcommerz/cancel", sslcommerzCancelController)

paymentRoutes.post("/sslcommerz/ipn", sslcommerzIPNController)
