import { createBkashSubscription, getBkashSubscriptionFromBkashById } from '../paymentGetway/recurring/recurring.bkash';
import { Autopay } from './autopay.model';
import { buildBkashAutopayRequestData } from '../paymentGetway/recurring/recurring.bkash.utils';
import { CustomError } from '../../errors/CustomError';

const getSubscriptionRequestId = (query: Record<string, unknown>) => {
  const raw =
    query.subscriptionRequestId ||
    query.subscriptionRequestID ||
    query.requestId ||
    query.requestID;

  return typeof raw === 'string' ? raw.trim() : '';
};

const isFailureStatus = (status?: string) => {
  if (!status) return false;
  const normalized = status.toLowerCase();
  return ['failure', 'failed', 'cancel', 'cancelled', 'canceled'].includes(
    normalized,
  );
};

const isSuccessStatus = (status?: string) => {
  if (!status) return false;
  const normalized = status.toLowerCase();
  return ['success', 'succeeded', 'active', 'activated'].includes(normalized);
};

const findAutopayRecord = async (
  query: Record<string, unknown>,
  requestId: string,
) => {
  if (requestId) {
    const byRequestId = await Autopay.findOne({ subscriptionId: requestId });
    if (byRequestId) return byRequestId;
  }

  const reference =
    typeof query.reference === 'string' ? query.reference.trim() : '';

  if (reference) {
    return Autopay.findOne({ subscriptionReference: reference });
  }

  return null;
};

export const getRecurringAmountQueryService = async (
  query: Record<string, unknown>,
) => {
  const requestId = getSubscriptionRequestId(query);

  if (!requestId) {
    throw new CustomError(400, 'subscriptionRequestId is required');
  }

  const autopay = await Autopay.findOne({ subscriptionId: requestId });

  if (!autopay) {
    throw new CustomError(404, 'Subscription not found');
  }

  return {
    amount: autopay.amount,
    firstPaymentAmount: autopay.amount,
    currency: 'BDT',
  };
};

export const verifyBkashRecurringCallbackService = async (
  query: Record<string, unknown>,
) => {
  const requestId = getSubscriptionRequestId(query);
  const status =
    typeof query.status === 'string'
      ? query.status
      : typeof query.subscriptionStatus === 'string'
        ? query.subscriptionStatus
        : undefined;

  if (!requestId) {
    return {
      success: false,
      message: 'Subscription request ID missing in callback URL',
    };
  }

  const autopay = await findAutopayRecord(query, requestId);

  if (!autopay) {
    return {
      success: false,
      message: 'Subscription not found',
      requestId,
    };
  }

  const resolvedRequestId = autopay.subscriptionId || requestId;

  if (isFailureStatus(status)) {
    await Autopay.findByIdAndUpdate(autopay._id, { status: 'failed' });
    return {
      success: false,
      message: 'Subscription failed or cancelled',
      requestId: resolvedRequestId,
      amount: autopay.amount,
    };
  }

  if (isSuccessStatus(status)) {
    await Autopay.findByIdAndUpdate(autopay._id, {
      status: 'activated',
      gatewayResponse: { callback: query },
    });

    return {
      success: true,
      message: 'Recurring subscription activated',
      requestId: resolvedRequestId,
      amount: autopay.amount,
      trxID: resolvedRequestId,
    };
  }

  try {
    const bkashResult = await getBkashSubscriptionFromBkashById(resolvedRequestId);
    const bkashData = bkashResult?.data?.data ?? bkashResult?.data ?? bkashResult;
    const bkashStatus = String(
      bkashData?.subscriptionStatus || bkashData?.status || '',
    ).toUpperCase();
    const isActivated =
      bkashStatus === 'ACTIVE' ||
      bkashStatus === 'ACTIVATED' ||
      bkashStatus === 'SUCCEEDED' ||
      bkashData?.statusCode === '0000';

    if (isActivated) {
      await Autopay.findByIdAndUpdate(autopay._id, {
        status: 'activated',
        gatewayResponse: bkashData,
      });

      return {
        success: true,
        message: 'Recurring subscription activated',
        requestId: resolvedRequestId,
        amount: autopay.amount,
        trxID: resolvedRequestId,
      };
    }

    await Autopay.findByIdAndUpdate(autopay._id, {
      status: 'failed',
      gatewayResponse: bkashData,
    });

    return {
      success: false,
      message: 'Subscription activation failed',
      requestId: resolvedRequestId,
      amount: autopay.amount,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || 'Subscription verification failed',
      requestId: resolvedRequestId,
      amount: autopay.amount,
    };
  }
};

export const createAutopay = async (payload: any) => {
  const { requestBody, recordData } = buildBkashAutopayRequestData(payload);
  const autopayRecord = await Autopay.create(recordData);

  try {
    const bkashResponse = await createBkashSubscription(payload, requestBody);

    // Update record with gateway response and identifiers if present
    const update: any = {
      gatewayResponse: bkashResponse,
      status: 'initiated',
    };

    if (bkashResponse.subscriptionRequestId) {
      update.subscriptionId = bkashResponse.subscriptionRequestId;
      update['metadata.bkash.subscriptionRequestId'] = bkashResponse.subscriptionRequestId;
    }

    if (bkashResponse.subscriptionReference) {
      update.subscriptionReference = bkashResponse.subscriptionReference;
    }

    if (bkashResponse.redirectURL || bkashResponse.redirectUrl) {
      update['metadata.bkash.redirectURL'] = bkashResponse.redirectURL || bkashResponse.redirectUrl;
    }

    if (bkashResponse.expirationTime) {
      update['metadata.bkash.expirationTime'] = bkashResponse.expirationTime;
    }

    await Autopay.findByIdAndUpdate(autopayRecord._id, update, { new: true });

    return { autopay: autopayRecord, bkash: bkashResponse };
  } catch (error: any) {
    // mark record as deactive and attach error
    await Autopay.findByIdAndUpdate(autopayRecord._id, {
      status: 'deactive',
      gatewayResponse: { error: error.message || error },
    });
    throw error;
  }
};

export const getAutopayByRequestId = async (requestId: string) => {
  const result = await getBkashSubscriptionFromBkashById(requestId); // optional: fetch latest data from bKash for this subscription
  // const result = await Autopay.findOne({ subscriptionId: requestId });
  return result;
};

// export const extendAutopay = async (payload: any) => {
//   return await extendBkashSubscription(payload);
// };

// export const refundAutopay = async (payload: any) => {
//   return await refundBkashPayment(payload);
// };

// export const listAutopays = async (page: number, size: number) => {
//   return await listBkashSubscriptions(page, size);
// };

// export const getAutopayById = async (id: number) => {
//   return await getBkashSubscriptionById(id);
// };

// export const cancelAutopay = async (id: number, reason: string) => {
//   return await cancelBkashSubscription(id, reason);
// };

// export const findAutopayByRequestId = async (requestId: string) => {
//   return await findBkashByRequestId(requestId);
// };

// export const getAutopaySchedule = async (frequency: string, startDate: string, expiryDate: string) => {
//   return await getBkashSchedule(frequency, startDate, expiryDate);
// };

// export const getAutopayPaymentById = async (id: number) => {
//   return await getBkashPaymentById(id);
// };

// export const getPaymentsBySubscriptionId = async (subscriptionId: number) => {
//   return await findPaymentsBySubscriptionId(subscriptionId);
// };
// // autopay.service.ts
//     import { QueryBuilder } from "../../builder/QueryBuilder";
//     import { IAutopay } from "./autopay.interface";
//     import { Autopay } from "./autopay.model";

//     // Create New autopay service

//     export const createAutopayService = async (payload: IAutopay) => {
//   const result = await Autopay.create(payload);
//   return result;
// };

// // getAll autopay service

//     export const getAllAutopayService = async (query: Record<string, unknown>) => {
//       const autopayQueries = new QueryBuilder(Autopay.find(), query)
//       .sort()
//       .filter()
//       .search([
//             'name',
//             'category',
//             'description',
//             // replace  with proper fields
//             ])
//       .fields()
//       .paginate()

//       const result = await autopayQueries.modelQuery;
//       return result ;
// };

// // get autopay by Id or single  service

// export const getAutopayByIdService = async (id:string) => {
//   const result = await Autopay.findById(id);
//   return result;
// };

// // delete autopay by Id or single  service

// export const deleteAutopayByIdService = async (id:string) => {
//   const result = await Autopay.findByIdAndDelete(id);
//   return result;
// };
// // update autopay by Id or single  service

// export const updateAutopayByIdService = async (id:string,payload:Partial<IAutopay>) => {
//   const result = await Autopay.findByIdAndUpdate(id,payload,{

//       new: true,
//       runValidators: true,

//   });
//   return result;
// };
