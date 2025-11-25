
  // Payment.controller.ts
  import { RequestHandler } from 'express';
  import {  sendResponse } from '../../utils/sendResponse';
  import { catchAsync } from '../../utils/catchAsync';
  import { 
  createPaymentService,
   getAllPaymentService ,
   getPaymentByIdService,
   updatePaymentByIdService,
   deletePaymentByIdService,
   verifyBkashPaymentService
   } from './payment.service'; // Update with your service path

  export const createPaymentController: RequestHandler = catchAsync(async (req, res) => {
    const result = await createPaymentService(req.body);
    sendResponse(res, {
      status: 201,
      success: true,
      message: 'Successfully created payment',
      data: result,
    });
  });

export const verifyBkashController: RequestHandler = catchAsync(async (req, res) => {
  const result = await verifyBkashPaymentService(req.query);

  if (result.success) {
    // Redirect to frontend payment status page with query params
    const redirectUrl = new URL("http://localhost:3000/payment-status");
    redirectUrl.searchParams.append("paymentId", req.query.paymentID as string);
    redirectUrl.searchParams.append("trxID", result.trxID);
    redirectUrl.searchParams.append("amount", result.amount?.toString() || "0");

    return res.redirect(redirectUrl.toString());
  } else {
    // If failed, redirect with failed status
    const redirectUrl = new URL("http://localhost:3000/payment-status");
    redirectUrl.searchParams.append("paymentId", req.query.paymentID as string);
    redirectUrl.searchParams.append("status", "failed");
    redirectUrl.searchParams.append("message", result.message);

    return res.redirect(redirectUrl.toString());
  }
});


  // Get All Payment 

    export const getAllPaymentController: RequestHandler = catchAsync(async (req, res) => {
    const {result,meta} = await getAllPaymentService(req.query);
    sendResponse(res, {
      status: 200,
      success: true,
      message: 'payment retrived successfully',
      data: result,
      meta: meta
    });
  });


  // Get single Payment 

    export const getPaymentByIdController: RequestHandler = catchAsync(async (req, res) => {
    const result = await getPaymentByIdService(req.params.id);
    sendResponse(res, {
      status: 200,
      success: true,
      message: 'payment retrived successfully',
      data: result,
    });
  });


  // update Payment 

    export const updatePaymentByIdController: RequestHandler = catchAsync(async (req, res) => {
    const result = await updatePaymentByIdService(req.params.id,req.body);
    sendResponse(res, {
      status: 200,
      success: true,
      message: 'payment updated successfully',
      data: result,
    });
  });

  // delete Payment 

    export const deletePaymentByIdController: RequestHandler = catchAsync(async (req, res) => {
    const result = await deletePaymentByIdService(req.params.id);
    sendResponse(res, {
      status: 200,
      success: true,
      message: 'payment deleted successfully',
      data: result,
    });
  });


  