// payment.service.ts
import { QueryBuilder } from "../../builder/QueryBuilder";
import { baseUrl, bkashKey, bkashUrl } from "../../config";
import { CustomError } from "../../errors/CustomError";
import { getBkashIdToken } from "../bkash/bkash.service";
import { IPayment } from "./payment.interface";
import Payment from "./payment.model";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

// Create New payment service

export const createPaymentService = async (payload: any) => {
  const { name, email, phone, amount, donationType, donorMessage } = payload;

  // Step 1: Create bKash payment
  const bkashResponse = await axios.post(
    `${bkashUrl}/checkout/create`,
    {
      mode: "0011",
      payerReference: phone || "donor",
      callbackURL: `${baseUrl}/api/v1/payment/verify`,
      amount,
      currency: "BDT",
      intent: "sale",
      merchantInvoiceNumber: "Inv" + uuidv4().slice(-5),
    },
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        authorization: getBkashIdToken(),
        "x-app-key": bkashKey,
      },
    }
  );
  const data = bkashResponse.data;
  if (!data.bkashURL) throw new CustomError(data.statusCode || 500, data.errorMessage || 'internal server error ')

  // Step 2: Save initial payment data
  await Payment.create({
    name,
    email,
    phone,
    amount,
    donationType,
    donorMessage,
    trxID: "",
    paymentId: data.paymentID,
    status: "pending",
  });

  // Step 3: Return redirect URL
  return { url: data.bkashURL };
};

// verifypayment

export const verifyBkashPaymentService = async (query: any) => {
  const { paymentID, status } = query;

  if (!paymentID) {
    return {
      success: false,
      message: "Payment ID missing in callback URL",
    };
  }

  // Fetch current payment from DB
  const payment = await Payment.findOne({ paymentId: paymentID });
  if (!payment) {
    return {
      success: false,
      message: "Payment not found",
      paymentID,
    };
  }

  // If already success, return info
  if (payment.status === "success") {
    return {
      success: true,
      message: "Payment already successful",
      paymentId: payment.paymentId,
      trxID: payment.trxID,
      amount: payment.amount,
    };
  }

  // If user cancelled or bKash failed
  if (status !== "success") {
    await Payment.findOneAndUpdate(
      { paymentId: paymentID, status: { $ne: "success" } },
      { status: "failed" }
    );

    return {
      success: false,
      message: "Payment failed or cancelled",
      paymentID,
    };
  }

  // Call bKash Execute Payment API
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

  // If execution successful
  if (data.statusCode === "0000") {
    await Payment.findOneAndUpdate(
      { paymentId: paymentID, status: { $ne: "success" } },
      {
        status: "success",
        trxID: data.trxID,
        amount: data.amount,
        bkashResponse: data,
      }
    );

    return {
      success: true,
      message: "Payment successful",
      paymentID,
      trxID: data.trxID,
      amount: data.amount,
    };
  }

  // Execution failed
  await Payment.findOneAndUpdate(
    { paymentId: paymentID, status: { $ne: "success" } },
    {
      status: "failed",
      trxID: data.trxID || "",
    }
  );

  return {
    success: false,
    message: "Payment execution failed",
    paymentID,
    trxID: data.trxID || "",
  };
};



// getAll payment service

export const getAllPaymentService = async (query: Record<string, unknown>) => {
  const paymentQueries = new QueryBuilder(Payment.find(), query)
    .sort()
    .filter()
    .search([
      'name',
      'category',
      'description',
      // replace  with proper fields
    ])
    .fields()
    .paginate()

  const result = await paymentQueries.modelQuery;
  return result;
};

// get payment by Id or single  service

export const getPaymentByIdService = async (id: string) => {
  const result = await Payment.findById(id);
  return result;
};

// delete payment by Id or single  service

export const deletePaymentByIdService = async (id: string) => {
  const result = await Payment.findByIdAndDelete(id);
  return result;
};
// update payment by Id or single  service

export const updatePaymentByIdService = async (id: string, payload: Partial<IPayment>) => {
  const result = await Payment.findByIdAndUpdate(id, payload, {

    new: true,
    runValidators: true,

  });
  return result;
};


