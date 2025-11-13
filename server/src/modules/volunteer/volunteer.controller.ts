
  // Volunteer.controller.ts
  import { RequestHandler } from 'express';
  import {  sendResponse } from '../../utils/sendResponse';
  import { catchAsync } from '../../utils/catchAsync';
  import { 
  createVolunteerService,
   getAllVolunteerService ,
   getVolunteerByIdService,
   updateVolunteerByIdService,
   deleteVolunteerByIdService
   } from './volunteer.service'; // Update with your service path

  export const createVolunteerController: RequestHandler = catchAsync(async (req, res) => {
    const result = await createVolunteerService(req.body);
    sendResponse(res, {
      status: 201,
      success: true,
      message: 'Successfully created volunteer',
      data: result,
    });
  });

  // Get All Volunteer 

    export const getAllVolunteerController: RequestHandler = catchAsync(async (req, res) => {
    const result = await getAllVolunteerService(req.query);
    sendResponse(res, {
      status: 200,
      success: true,
      message: 'volunteer retrived successfully',
      data: result,
    });
  });


  // Get single Volunteer 

    export const getVolunteerByIdController: RequestHandler = catchAsync(async (req, res) => {
    const result = await getVolunteerByIdService(req.params.id);
    sendResponse(res, {
      status: 200,
      success: true,
      message: 'volunteer retrived successfully',
      data: result,
    });
  });


  // update Volunteer 

    export const updateVolunteerByIdController: RequestHandler = catchAsync(async (req, res) => {
    const result = await updateVolunteerByIdService(req.params.id,req.body);
    sendResponse(res, {
      status: 200,
      success: true,
      message: 'volunteer updated successfully',
      data: result,
    });
  });

  // delete Volunteer 

    export const deleteVolunteerByIdController: RequestHandler = catchAsync(async (req, res) => {
    const result = await deleteVolunteerByIdService(req.params.id);
    sendResponse(res, {
      status: 200,
      success: true,
      message: 'volunteer deleted successfully',
      data: result,
    });
  });


  