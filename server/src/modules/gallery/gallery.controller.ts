
// Gallery.controller.ts
import { RequestHandler } from 'express';
import { sendResponse } from '../../utils/sendResponse';
import { catchAsync } from '../../utils/catchAsync';
import {
  createGalleryService,
  getAllGalleryService,
  getGalleryByIdService,
  updateGalleryByIdService,
  deleteGalleryByIdService
} from './gallery.service'; // Update with your service path
import { handleMulterUpload } from '../../utils/uploader/multerHandler';

export const createGalleryController: RequestHandler = catchAsync(async (req, res) => {
  let formattedData = req.body;

  if (req.files) {
    const imageInfo: any = await handleMulterUpload(req.files);
    formattedData = { ...imageInfo, ...req.body, user: (req.user as any)?.userId };
  }
  const result = await createGalleryService(formattedData);
  sendResponse(res, {
    status: 201,
    success: true,
    message: 'Successfully created gallery',
    data: result,
  });
});

// Get All Gallery 

export const getAllGalleryController: RequestHandler = catchAsync(async (req, res) => {
  const result = await getAllGalleryService(req.query);
  sendResponse(res, {
    status: 200,
    success: true,
    message: 'gallery retrived successfully',
    data: result,
  });
});


// Get single Gallery 

export const getGalleryByIdController: RequestHandler = catchAsync(async (req, res) => {
  const result = await getGalleryByIdService(req.params.id);
  sendResponse(res, {
    status: 200,
    success: true,
    message: 'gallery retrived successfully',
    data: result,
  });
});


// update Gallery 

export const updateGalleryByIdController: RequestHandler = catchAsync(async (req, res) => {
  let formattedData = req.body;

  if (req.files) {
    const imageInfo: any = await handleMulterUpload(req.files);
    formattedData = { ...imageInfo, ...req.body, user: (req.user as any)?.userId };
  }
  const result = await updateGalleryByIdService(req.params.id, formattedData);
  sendResponse(res, {
    status: 200,
    success: true,
    message: 'gallery updated successfully',
    data: result,
  });
});

// delete Gallery 

export const deleteGalleryByIdController: RequestHandler = catchAsync(async (req, res) => {
  const result = await deleteGalleryByIdService(req.params.id);
  sendResponse(res, {
    status: 200,
    success: true,
    message: 'gallery deleted successfully',
    data: result,
  });
});


