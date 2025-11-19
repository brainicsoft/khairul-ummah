
// Activities.controller.ts
import { RequestHandler } from 'express';
import { sendResponse } from '../../utils/sendResponse';
import { catchAsync } from '../../utils/catchAsync';
import {
  createActivitiesService,
  getAllActivitiesService,
  getActivitiesByIdService,
  updateActivitiesByIdService,
  deleteActivitiesByIdService
} from './activities.service'; // Update with your service path
import { handleMulterUpload } from '../../utils/uploader/multerHandler';
import { generateSlug } from '../../utils/generateSlug';
import { Activities } from './activities.model';

export const createActivitiesController: RequestHandler = catchAsync(async (req, res) => {
  let formattedData = req.body;
  if (req.files) {
    const imageInfo: any = await handleMulterUpload(req.files);
    formattedData = { ...imageInfo, ...req.body, user: (req.user as any)?.userId };
  }
  // Generate slug manually (Bangla + English)
  let baseSlug = generateSlug(formattedData.title);
  const existingTitle = await Activities.findOne({ title: formattedData.title });
  if (existingTitle) {
    return sendResponse(res, {
      status: 409,
      success: false,
      message: "A project with this title already exists!",
    });
  }
  formattedData.slug = baseSlug;

  const result = await createActivitiesService(formattedData);
  sendResponse(res, {
    status: 201,
    success: true,
    message: 'Successfully created activities',
    data: result,
  });
});

// Get All Activities 

export const getAllActivitiesController: RequestHandler = catchAsync(async (req, res) => {
  const result = await getAllActivitiesService(req.query);
  sendResponse(res, {
    status: 200,
    success: true,
    message: 'activities retrived successfully',
    data: result,
  });
});


// Get single Activities 

export const getActivitiesByIdController: RequestHandler = catchAsync(async (req, res) => {
  const result = await getActivitiesByIdService(req.params.id);
  sendResponse(res, {
    status: 200,
    success: true,
    message: 'activities retrived successfully',
    data: result,
  });
});


// update Activities 

export const updateActivitiesByIdController: RequestHandler = catchAsync(async (req, res) => {
  let formattedData = req.body;

  if (req.files) {
    const imageInfo: any = await handleMulterUpload(req.files);
    formattedData = { ...imageInfo, ...req.body, user: (req.user as any)?.userId };
  }

  const result = await updateActivitiesByIdService(req.params.id, formattedData);
  sendResponse(res, {
    status: 200,
    success: true,
    message: 'activities updated successfully',
    data: result,
  });
});

// delete Activities 

export const deleteActivitiesByIdController: RequestHandler = catchAsync(async (req, res) => {
  const result = await deleteActivitiesByIdService(req.params.id);
  sendResponse(res, {
    status: 200,
    success: true,
    message: 'activities deleted successfully',
    data: result,
  });
});


