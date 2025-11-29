
  // Massege.controller.ts
  import { RequestHandler } from 'express';
  import {  sendResponse } from '../../utils/sendResponse';
  import { catchAsync } from '../../utils/catchAsync';
  import { 
  createMassegeService,
   getAllMassegeService ,
   getMassegeByIdService,
   updateMassegeByIdService,
   deleteMassegeByIdService
   } from './massege.service'; // Update with your service path

  export const createMassegeController: RequestHandler = catchAsync(async (req, res) => {
    const result = await createMassegeService(req.body);
    sendResponse(res, {
      status: 201,
      success: true,
      message: 'Successfully created massege',
      data: result,
    });
  });

  // Get All Massege 

    export const getAllMassegeController: RequestHandler = catchAsync(async (req, res) => {
    const result = await getAllMassegeService(req.query);
    sendResponse(res, {
      status: 200,
      success: true,
      message: 'massege retrived successfully',
      data: result,
    });
  });


  // Get single Massege 

    export const getMassegeByIdController: RequestHandler = catchAsync(async (req, res) => {
    const result = await getMassegeByIdService(req.params.id);
    sendResponse(res, {
      status: 200,
      success: true,
      message: 'massege retrived successfully',
      data: result,
    });
  });


  // update Massege 

    export const updateMassegeByIdController: RequestHandler = catchAsync(async (req, res) => {
    const result = await updateMassegeByIdService(req.params.id,req.body);
    sendResponse(res, {
      status: 200,
      success: true,
      message: 'massege updated successfully',
      data: result,
    });
  });

  // delete Massege 

    export const deleteMassegeByIdController: RequestHandler = catchAsync(async (req, res) => {
    const result = await deleteMassegeByIdService(req.params.id);
    sendResponse(res, {
      status: 200,
      success: true,
      message: 'massege deleted successfully',
      data: result,
    });
  });


  