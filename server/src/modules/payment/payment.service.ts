// payment.service.ts
import { QueryBuilder } from "../../builder/QueryBuilder";
import { baseUrl, bkashKey, bkashUrl } from "../../config";
import { CustomError } from "../../errors/CustomError";
import { createBkashPayment, getBkashIdToken } from "../paymentGetway/bkash.service";
import { createSslcommerzPayment } from "../paymentGetway/sslcommerz.service";
import { IPayment } from "./payment.interface";
import Payment from "./payment.model";
import axios from "axios";


// Create New payment service

// export const createPaymentService = async (payload: any) => {
//   const { name, email, phone, amount, donationType, donorMessage, method = 'bkash' } = payload;

//   let paymentResponse;
//   let paymentUrl;

//   // Step 1: Choose payment method
//   if (method === 'bkash') {
//     paymentResponse = await createBkashPayment(payload);
//      paymentUrl = paymentResponse.bkashURL;
//   } else if (method === 'sslcommerz') {
//     // Step 2: Create SSLCOMMERZ payment
//     console.log("method", method)
//     paymentResponse = await createSslcommerzPayment(payload);
//     paymentUrl = paymentResponse.GatewayPageURL;
//   } else {
//     throw new Error(`Payment method ${method} is not supported`);
//   }

//   await Payment.create({
//     name,
//     email,
//     phone,
//     amount,
//     donationType,
//     donorMessage,
//     trxID: paymentResponse.trxID || "",
//     paymentId: paymentResponse.paymentID || "",
//     status: "pending",
//   });


//  return { url: paymentUrl }
// };



// --- Bkash Payment Function ---
const handleBkashPayment = async (payload: any) => {
  const paymentResponse = await createBkashPayment(payload);

  if (!paymentResponse?.bkashURL) {
    throw new Error("Bkash URL missing in response");
  }

  // Save to DB
  const payment = await Payment.create({
    name: payload.name,
    email: payload.email,
    phone: payload.phone,
    amount: payload.amount,
    donationType: payload.donationType,
    donorMessage: payload.donorMessage,
    trxID: paymentResponse.trxID || "",
    paymentId: paymentResponse.paymentID || "",
    status: "pending",
    gatewayUrl: paymentResponse.bkashURL,
    method: "bkash",
  });

  return { url: paymentResponse.bkashURL, payment };
};

// --- SSLCOMMERZ Payment Function ---
const handleSslcommerzPayment = async (payload: any) => {
  const paymentResponse = await createSslcommerzPayment(payload);

  if (!paymentResponse?.GatewayPageURL) {
    throw new Error("SSLCOMMERZ GatewayPageURL missing");
  }

  const paymentId = `ssl_${Date.now()}`; // unique id

  const payment = await Payment.create({
    name: payload.name,
    email: payload.email,
    phone: payload.phone,
    amount: payload.amount,
    donationType: payload.donationType,
    donorMessage: payload.donorMessage,
    trxID: "", // updated after payment success
    paymentId,
    status: "pending",
    gatewayUrl: paymentResponse.GatewayPageURL,
    redirectUrl: paymentResponse.redirectGatewayURL,
    method: "sslcommerz",
  });

  return { url: paymentResponse.GatewayPageURL, payment };
};

// --- Main Payment Service ---
export const createPaymentService = async (payload: any) => {
  const { method = "bkash" } = payload;

  if (method === "bkash") {
    return handleBkashPayment(payload);
  } else if (method === "sslcommerz") {
    return handleSslcommerzPayment(payload);
  } else {
    throw new Error(`Payment method ${method} is not supported`);
  }
};

// -------------------------
// Verify SSLCOMMERZ Payment
// -------------------------
export const verifySslcommerzPaymentService = async (payload: any) => {
  const { tran_id, val_id, status, amount } = payload; // SSLCOMMERZ POST fields

  // Find payment by tran_id or custom paymentId
  const payment = await Payment.findOne({ paymentId: tran_id });
  if (!payment) return { success: false, message: 'Payment not found' };

  if (status === 'VALID') {
    payment.status = 'success';
    payment.trxID = val_id;
    payment.amount = amount;
    await payment.save();
    return { success: true };
  } else {
    payment.status = 'failed';
    await payment.save();
    return { success: false };
  }
};


// -------------------------
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
  const meta = await paymentQueries.countTotal();
  return {
    result,
    meta
  };
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


// =============================
// Get Payment Summary Service
// =============================

// export const getPaymentSummaryService = async () => {

//   // 1) Total Amount
//   const totalAmountResult = await Payment.aggregate([
//     {
//       $group: {
//         _id: null,
//         totalAmount: { $sum: "$amount" }
//       }
//     }
//   ]);

//   const totalAmount = totalAmountResult[0]?.totalAmount || 0;

//   // 2) Donation Type Wise Total
//   const donationTypeTotals = await Payment.aggregate([
//     {
//       $group: {
//         _id: "$donationType",
//         totalAmount: { $sum: "$amount" },
//         count: { $sum: 1 }
//       }
//     }
//   ]);

//   // 3) Status Counts
//   const statusCounts = await Payment.aggregate([
//     {
//       $group: {
//         _id: "$status",
//         count: { $sum: 1 }
//       }
//     }
//   ]);

//   // Make clean status count object
//   const statusMap: Record<string, number> = {
//     success: 0,
//     pending: 0,
//     failed: 0,
//   };

//   statusCounts.forEach(item => {
//     statusMap[item._id] = item.count;
//   });

//   return {
//     totalAmount,
//     donationTypeTotals,
//     status: statusMap,
//   };
// };

export const getPaymentSummaryService = async () => {
  // 1) Get all donation types from DB
  const allTypes = await Payment.distinct("donationType");

  // 2) Aggregate successful payments
  const successPayments = await Payment.aggregate([
    { $match: { status: "success" } },
    {
      $group: {
        _id: "$donationType",
        totalAmount: { $sum: "$amount" },
        count: { $sum: 1 },
      },
    },
  ]);

  // Map results to a dictionary
  const donationMap: Record<string, { totalAmount: number; count: number }> = {};
  successPayments.forEach(item => {
    donationMap[item._id] = {
      totalAmount: item.totalAmount,
      count: item.count,
    };
  });

  // Ensure all types are present
  const donationTypeTotals = allTypes.map(type => ({
    _id: type,
    totalAmount: donationMap[type]?.totalAmount || 0,
    count: donationMap[type]?.count || 0,
  }));

  // Total amount across all successful payments
  const totalAmount = donationTypeTotals.reduce(
    (sum, item) => sum + item.totalAmount,
    0
  );

  // Status counts (all payments)
  const statusCounts = await Payment.aggregate([
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
      },
    },
  ]);

  const statusMap: Record<string, number> = {
    success: 0,
    pending: 0,
    failed: 0,
  };
  statusCounts.forEach(item => {
    statusMap[item._id] = item.count;
  });

  return {
    totalAmount,
    donationTypeTotals,
    status: statusMap,
  };
};
