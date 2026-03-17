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

  // Update created record with gateway info and subscription id
  created.subscriptionId = bkashResp.subscriptionRequestId || String(created._id);
  created.metadata = { ...(created.metadata || {}), bkash: bkashResp };
  await created.save();

  return { subscription: created, redirectURL: bkashResp.redirectURL, expirationTime: bkashResp.expirationTime };
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

    
      