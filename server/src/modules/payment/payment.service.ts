import { QueryBuilder } from "../../builder/QueryBuilder";
import { bkashKey, bkashUrl } from "../../config";
import { CustomError } from "../../errors/CustomError";
import { 
  createBkashPayment, 
  getBkashIdToken 
} from "../paymentGetway/bkash.service";
import {
  createSslcommerzPayment,
  validateSslcommerzPayment,
  handleSslSuccess,
  handleSslFail,
  handleSslCancel,
} from "../paymentGetway/sslcommerz.service";
import type { IPayment } from "./payment.interface";
import Payment from "./payment.model";
import axios from "axios";

/**
 * Create payment - handles both bKash and SSLCommerz
 */
export const createPaymentService = async (payload: any) => {
  const { name, email, phone, amount, donationType, donorMessage, method = "bkash" } = payload;

  if (method === "bkash") {
    return await handleBkashPayment({ name, email, phone, amount, donationType, donorMessage });
  } else if (method === "sslcommerz") {
    return await handleSslcommerzPayment({ name, email, phone, amount, donationType, donorMessage });
  } else {
    throw new CustomError(400, `Payment method ${method} is not supported`);
  }
};

/**
 * Handle bKash payment
 */
const handleBkashPayment = async (payload: any) => {
  const paymentResponse = await createBkashPayment(payload);

  if (!paymentResponse?.bkashURL) {
    throw new CustomError(500, "bKash URL missing in response");
  }

  if (!paymentResponse.paymentID) {
    throw new CustomError(500, "bKash Payment ID missing in response");
  }

  const payment = await Payment.create({
    name: payload.name,
    email: payload.email,
    phone: payload.phone,
    amount: payload.amount,
    donationType: payload.donationType,
    donorMessage: payload.donorMessage,
    tran_id: paymentResponse.paymentID,
    status: "pending",
    method: "bkash",
  });

  return {
    url: paymentResponse.bkashURL,
    payment,
  };
};


/**
 * Handle SSLCommerz payment
 */
const handleSslcommerzPayment = async (payload: any) => {
  const paymentResponse = await createSslcommerzPayment(payload);

  if (!paymentResponse?.GatewayPageURL) {
    throw new CustomError(500, "SSLCommerz GatewayPageURL missing");
  }

  console.log("[Payment Service] SSLCommerz payment created successfully");

  return {
    url: paymentResponse.GatewayPageURL,
    redirectUrl: paymentResponse.GatewayPageURL,
  };
};

/**
 * Verify bKash payment
 */
export const verifyBkashPaymentService = async (query: any) => {
  const { paymentID, status } = query;

  if (!paymentID) {
    return { success: false, message: "Payment ID missing in callback URL" };
  }

  const payment = await Payment.findOne({ tran_id: paymentID });
  if (!payment) {
    return { success: false, message: "Payment not found", paymentID };
  }

  if (payment.status === "success") {
    return { success: true, message: "Payment already successful", trxID: payment.trxID, amount: payment.amount };
  }

  if (status !== "success") {
    await Payment.findOneAndUpdate({ tran_id: paymentID, status: { $ne: "success" } }, { status: "failed" });
    return { success: false, message: "Payment failed or cancelled", paymentID };
  }

  const { data } = await axios.post(
    `${bkashUrl}/checkout/execute`,
    { paymentID },
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        authorization: getBkashIdToken(),
        "x-app-key": bkashKey,
      },
    }
  );

  if (data.statusCode === "0000") {
    await Payment.findOneAndUpdate(
      { tran_id: paymentID, status: { $ne: "success" } },
      { status: "success", amount: data.amount, paymentGatewayResponse: data }
    );

    return { success: true, message: "Payment successful", trxID: data.trxID, amount: data.amount };
  }

  await Payment.findOneAndUpdate({ tran_id: paymentID, status: { $ne: "success" } }, { status: "failed" });
  return { success: false, message: "Payment execution failed", paymentID };
};

/**
 * Process SSLCommerz IPN
 */
export const processSslcommerzIPNService = async (payload: any) => {
  try {
    console.log("[Payment Service] Processing SSLCommerz IPN:", payload);
    const result = await validateSslcommerzPayment(payload);
    return result;
  } catch (error: any) {
    console.error("[Payment Service] IPN processing error:", error.message);
    return { success: false, message: error.message };
  }
};

/**
 * Handle SSLCommerz redirect
 */
export const handleSslSuccessService = async (tran_id: string) => {
  return await handleSslSuccess(tran_id);
};
export const handleSslFailService = async (tran_id: string) => {
  return await handleSslFail(tran_id);
};
export const handleSslCancelService = async (tran_id: string) => {
  return await handleSslCancel(tran_id);
};

/**
 * Payment CRUD & Queries
 */
export const getPaymentStatusService = async (id: string) => {
  const payment = await Payment.findById(id);
  if (!payment) throw new CustomError(404, "Payment not found");
  return payment;
};

export const getAllPaymentService = async (query: Record<string, unknown>) => {
  const paymentQueries = new QueryBuilder(Payment.find(), query)
    .sort()
    .filter()
    .search(["name", "email", "phone", "donationType"])
    .fields()
    .paginate();

  const result = await paymentQueries.modelQuery;
  const meta = await paymentQueries.countTotal();
  return { result, meta };
};

export const getPaymentByIdService = async (id: string) => await Payment.findById(id);
export const deletePaymentByIdService = async (id: string) => await Payment.findByIdAndDelete(id);
export const updatePaymentByIdService = async (id: string, payload: Partial<IPayment>) =>
  await Payment.findByIdAndUpdate(id, payload, { new: true, runValidators: true });

/**
 * Payment summary
 */
export const getPaymentSummaryService = async () => {
  const allTypes = await Payment.distinct("donationType");

  const successPayments = await Payment.aggregate([
    { $match: { status: "success" } },
    { $group: { _id: "$donationType", totalAmount: { $sum: "$amount" }, count: { $sum: 1 } } },
  ]);

  const donationMap: Record<string, { totalAmount: number; count: number }> = {};
  successPayments.forEach((item) => {
    donationMap[item._id] = { totalAmount: item.totalAmount, count: item.count };
  });

  const donationTypeTotals = allTypes.map((type) => ({
    _id: type,
    totalAmount: donationMap[type]?.totalAmount || 0,
    count: donationMap[type]?.count || 0,
  }));

  const totalAmount = donationTypeTotals.reduce((sum, item) => sum + item.totalAmount, 0);

  const statusCounts = await Payment.aggregate([{ $group: { _id: "$status", count: { $sum: 1 } } }]);
  const statusMap: Record<string, number> = { success: 0, pending: 0, failed: 0, cancelled: 0 };
  statusCounts.forEach((item) => {
    statusMap[item._id] = item.count;
  });

  return { totalAmount, donationTypeTotals, status: statusMap };
};
