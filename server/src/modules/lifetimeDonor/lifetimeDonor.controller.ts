
  // LifetimeDonor.controller.ts
  import { RequestHandler } from 'express';
  import {  sendResponse } from '../../utils/sendResponse';
  import { catchAsync } from '../../utils/catchAsync';
  import { 
  createLifetimeDonorService,
   getAllLifetimeDonorService ,
   getLifetimeDonorByIdService,
   updateLifetimeDonorByIdService,
   deleteLifetimeDonorByIdService
   } from './lifetimeDonor.service'; // Update with your service path
import { generateSlug } from '../../utils/generateSlug';

  export const createLifetimeDonorController: RequestHandler = catchAsync(async (req, res) => {
    // generateSlug(formattedData.name);
    const data = req.body;
    const baseSlug = generateSlug(data.name);
    data.slug = baseSlug;
    const result = await createLifetimeDonorService(data);
    sendResponse(res, {
      status: 201,
      success: true,
      message: 'Successfully created lifetimeDonor',
      data: result,
    });
  });

  // Get All LifetimeDonor 

    export const getAllLifetimeDonorController: RequestHandler = catchAsync(async (req, res) => {
    const result = await getAllLifetimeDonorService(req.query);
    sendResponse(res, {
      status: 200,
      success: true,
      message: 'lifetimeDonor retrived successfully',
      data: result,
    });
  });


  // Get single LifetimeDonor 

    export const getLifetimeDonorByIdController: RequestHandler = catchAsync(async (req, res) => {
    const result = await getLifetimeDonorByIdService(req.params.id);
    sendResponse(res, {
      status: 200,
      success: true,
      message: 'lifetimeDonor retrived successfully',
      data: result,
    });
  });


  // update LifetimeDonor 

    export const updateLifetimeDonorByIdController: RequestHandler = catchAsync(async (req, res) => {
    const result = await updateLifetimeDonorByIdService(req.params.id,req.body);
    sendResponse(res, {
      status: 200,
      success: true,
      message: 'lifetimeDonor updated successfully',
      data: result,
    });
  });

  // delete LifetimeDonor 

    export const deleteLifetimeDonorByIdController: RequestHandler = catchAsync(async (req, res) => {
    const result = await deleteLifetimeDonorByIdService(req.params.id);
    sendResponse(res, {
      status: 200,
      success: true,
      message: 'lifetimeDonor deleted successfully',
      data: result,
    });
  });


  