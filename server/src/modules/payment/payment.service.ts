// payment.service.ts
import { QueryBuilder } from "../../builder/QueryBuilder";
import { baseUrl, bkashKey, bkashUrl } from "../../config";
import { CustomError } from "../../errors/CustomError";
import { createBkashPayment, getBkashIdToken } from "../bkash/bkash.service";
import { IPayment } from "./payment.interface";
import Payment from "./payment.model";
import axios from "axios";


// Create New payment service

export const createPaymentService = async (payload: any) => {
  const { name, email, phone, amount, donationType, donorMessage,method='bkash' } = payload;

  // Step 1: Create bKash payment
  if(method==='bkash'){
    
    const bkashResponse = await createBkashPayment(payload);
    return bkashResponse;
  }

  // Step 2: Save initial payment data
  // await Payment.create({
  //   name,
  //   email,
  //   phone,
  //   amount,
  //   donationType,
  //   donorMessage,
  //   trxID: "",
  //   paymentId: data.paymentID,
  //   status: "pending",
  // });

  return payload
  // Step 3: Return redirect URL
  // return { url: bkashResponse.bkashURL };
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
