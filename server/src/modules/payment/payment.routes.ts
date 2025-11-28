import { Router } from "express"
import {
  createPaymentController,
  getAllPaymentController,
  getPaymentSummaryController,
  verifyBkashController,
  sslcommerzSuccessController,
  sslcommerzCancelController,
  sslcommerzIPNController,
  getPaymentStatusController,
} from "./payment.controller"
import auth from "../../middlewares/auth"

export const paymentRoutes: Router = Router()

// Create payment (bKash or SSLCommerz)
paymentRoutes.post("/create", createPaymentController)
// Get all payments
paymentRoutes.get("/",auth('admin'), getAllPaymentController)
// Get payment summary
paymentRoutes.get("/summary",auth('admin'), getPaymentSummaryController)
// Get specific payment status
paymentRoutes.get("/:id/status", getPaymentStatusController)
// bKash verification (callback)
paymentRoutes.get("/verify", verifyBkashController)





paymentRoutes.post("/sslcommerz/success", sslcommerzSuccessController)
paymentRoutes.post("/sslcommerz/cancel", sslcommerzCancelController)
paymentRoutes.post("/sslcommerz/ipn", sslcommerzIPNController)
