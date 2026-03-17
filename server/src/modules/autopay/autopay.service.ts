// import { CustomError } from "../../errors/CustomError";
// import {
//   createBkashSubscription,
//   extendBkashSubscription,
//   refundBkashPayment,
//   listBkashSubscriptions,
//   getBkashSubscriptionById,
//   cancelBkashSubscription,
//   findBkashByRequestId,
//   getBkashSchedule,
//   getBkashPaymentById,
//   findPaymentsBySubscriptionId,
// } from "../paymentGetway/bkash.service";

// export const createAutopay = async (payload: any) => {
//   return await createBkashSubscription(payload);
// };

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

    
      