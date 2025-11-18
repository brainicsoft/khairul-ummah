
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
    sendResponse(res, {
      status: 201,
      success: true,
      message: 'Successfully verified payment',
      data: result,
    });
  });

  // Get All Payment 

    export const getAllPaymentController: RequestHandler = catchAsync(async (req, res) => {
    const result = await getAllPaymentService(req.query);
    sendResponse(res, {
      status: 200,
      success: true,
      message: 'payment retrived successfully',
      data: result,
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


  