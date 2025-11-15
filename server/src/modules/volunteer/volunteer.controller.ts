
// Volunteer.controller.ts
import { RequestHandler } from 'express';
import { sendResponse } from '../../utils/sendResponse';
import { catchAsync } from '../../utils/catchAsync';
import {
  createVolunteerService,
  getAllVolunteerService,
  getVolunteerByIdService,
  updateVolunteerByIdService,
  deleteVolunteerByIdService
} from './volunteer.service'; // Update with your service path
import { handleMulterUpload } from '../../utils/uploader/multerHandler';

export const createVolunteerController: RequestHandler = catchAsync(async (req, res) => {
  let formattedData = req.body;

  if (req.files) {
    const imageInfo: any = await handleMulterUpload(req.files);
    formattedData = { ...imageInfo, ...req.body, user: (req.user as any)?.userId };
  }
  const result = await createVolunteerService(formattedData);

  sendResponse(res, {
    status: 201,
    success: true,
    message: 'Successfully created volunteer',
    data: formattedData,
  });
});

// Get All Volunteer 

export const getAllVolunteerController: RequestHandler = catchAsync(async (req, res) => {
  const {result,meta} = await getAllVolunteerService(req.query);
  sendResponse(res, {
    status: 200,
    success: true,
    message: 'volunteer retrived successfully',
    data: result,
    meta: meta,
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
  const result = await updateVolunteerByIdService(req.params.id, req.body);
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


