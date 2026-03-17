import { frontendUrl } from "../../config";
import { createBkashSubscription } from "../paymentGetway/bkash.service";
import { Autopay } from "./autopay.model";

export const createAutopay = async (payload: any) => {
  // Persist subscription data first
  const toCreate: any = {
    name: payload.name,
    email: payload.email,
    phone: payload.phone,
    amount: payload.amount,
    frequency: payload.frequency || 'DAILY',
    paymentType: payload.paymentType || 'FIXED',
    payerType: payload.payerType || 'CUSTOMER',
    startDate: payload.startDate ? new Date(payload.startDate) : undefined,
    endDate: payload.expiryDate ? new Date(payload.expiryDate) : undefined,
    metadata: payload.metadata || {},
  };

  const created = await Autopay.create(toCreate);

  // Then call bKash to create the gateway subscription
  const bkashResp = await createBkashSubscription({
    amount: payload.amount,
    frequency: payload.frequency || 'DAILY',
    startDate: payload.startDate,
    expiryDate: payload.expiryDate,
    // payer: { name: payload.name, email: payload.email, phone: payload.phone },
    payerType: payload.payerType || 'CUSTOMER',
    firstPaymentIncludedInCycle: payload.firstPaymentIncludedInCycle,
    // maxCapRequired: payload.maxCapRequired,
  });

  console.log('bKash subscription response:', bkashResp);
  // Update created record with gateway info and subscription id
  created.subscriptionId = bkashResp.subscriptionRequestId || String(created._id);
  created.metadata = { ...(created.metadata || {}), bkash: bkashResp };
  await created.save();

  return { subscription: created, redirectURL: bkashResp.redirectURL, expirationTime: bkashResp.expirationTime };
};

export const processBkashWebhook = async (subscriptionRequestId: string,reference:any) => {
  const { findBkashByRequestId } = await import("../paymentGetway/bkash.service");
  const bkashResp = await findBkashByRequestId(subscriptionRequestId);
  console.log(bkashResp,'bkash response')

  // try find by subscriptionId first, fallback to metadata lookup
  let autopay = await Autopay.findOne({ subscriptionId: subscriptionRequestId });
  if (!autopay) {
    autopay = await Autopay.findOne({ 'metadata.bkash.subscriptionRequestId': subscriptionRequestId });
  }

  if (!autopay) return { updated: false, bkash: bkashResp };

  // Map common fields from bKash response into our Autopay document
  try {
    // basic mappings into model fields only
    autopay.subscriptionId = bkashResp.subscriptionRequestId || autopay.subscriptionId;
    autopay.subscriptionReference = bkashResp.subscriptionReference || autopay.subscriptionReference;
    autopay.amount = bkashResp.amount ?? autopay.amount;
    autopay.frequency = bkashResp.frequency || autopay.frequency;

    if (bkashResp.startDate) autopay.startDate = new Date(bkashResp.startDate);
    if (bkashResp.expiryDate) autopay.endDate = new Date(bkashResp.expiryDate);
    if (bkashResp.nextPaymentDate) autopay.nextRunAt = new Date(bkashResp.nextPaymentDate);
    if (bkashResp.lastSuccessfulPaymentDate) autopay.lastRunAt = new Date(bkashResp.lastSuccessfulPaymentDate);

    const remoteStatus = bkashResp?.subscriptionStatus || bkashResp?.status || bkashResp?.state || null;
    let mappedStatus: any = autopay.status;
    if (remoteStatus) {
      const rs = String(remoteStatus).toUpperCase();
      if (rs.includes("ACTIVE") || rs.includes("AUTHORIZED") || rs.includes("APPROVED")) mappedStatus = "ACTIVE";
      else if (rs.includes("PAUSE") || rs.includes("PAUSED")) mappedStatus = "PAUSED";
      else if (rs.includes("CANCEL") || rs.includes("CANCELLED") || rs.includes("REVOKED")) mappedStatus = "CANCELLED";
      else if (rs.includes("EXPIRE") || rs.includes("EXPIRED")) mappedStatus = "EXPIRED";
      else if (rs.includes("SUCCEEDED") || rs.includes("SUCCESS")) mappedStatus = "ACTIVE";
    }

    autopay.status = mappedStatus;
    autopay.isActive = !!(bkashResp.active ?? (mappedStatus === "ACTIVE"));
    autopay.endDate = bkashResp.expired ;
    autopay.deductionFailureCount = bkashResp.deductionFailureCount ?? autopay.deductionFailureCount;
    autopay.nextPaymentDate=bkashResp.nextPaymentDate 

    // If this callback indicates a successful charge, mark last/next run and expiry
    if (remoteStatus && String(remoteStatus).toUpperCase().includes("SUCCEEDED")) {
      if (bkashResp.lastSuccessfulPaymentDate) autopay.lastRunAt = new Date(bkashResp.lastSuccessfulPaymentDate);
      if (bkashResp.nextPaymentDate) autopay.nextRunAt = new Date(bkashResp.nextPaymentDate);
      if (bkashResp.expiryDate) autopay.endDate = new Date(bkashResp.expiryDate);
      autopay.isActive = true;
    }


    // do not attach bkashValidation object — only persist fields available in the model
    await autopay.save();
    console.log(bkashResp)
       const redirectUrl = new URL(`${frontendUrl}/payment-status`)
       redirectUrl.searchParams.append("paymentId",subscriptionRequestId as string)
       redirectUrl.searchParams.append("val_id", reference as string)
       redirectUrl.searchParams.append("amount", bkashResp.amount?.toString() || "0")
   
       return {redirectUrl: redirectUrl.toString()};
  } catch (err: any) {
    console.error('processBkashWebhook mapping error', err?.message || err);
    return { updated: false, error: err?.message || err, bkash: bkashResp };
  }
}

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

    
      