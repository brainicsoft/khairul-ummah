
// Newsletter.controller.ts
import { RequestHandler } from 'express';
import { sendResponse } from '../../utils/sendResponse';
import { catchAsync } from '../../utils/catchAsync';
import {
  createNewsletterService,
  getAllNewsletterService,
  getNewsletterByIdService,
  updateNewsletterByIdService,
  deleteNewsletterByIdService
} from './newsletter.service'; // Update with your service path

export const createNewsletterController: RequestHandler = catchAsync(async (req, res) => {
  try {
    const result = await createNewsletterService(req.body);
    sendResponse(res, {
      status: 201,
      success: true,
      message: 'Successfully created newsletter',
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Subscription failed",
    });
  }
});

// Get All Newsletter 

export const getAllNewsletterController: RequestHandler = catchAsync(async (req, res) => {
  const result = await getAllNewsletterService(req.query);
  sendResponse(res, {
    status: 200,
    success: true,
    message: 'newsletter retrived successfully',
    data: result,
  });
});


// Get single Newsletter 

export const getNewsletterByIdController: RequestHandler = catchAsync(async (req, res) => {
  const result = await getNewsletterByIdService(req.params.id);
  sendResponse(res, {
    status: 200,
    success: true,
    message: 'newsletter retrived successfully',
    data: result,
  });
});


// update Newsletter 

export const updateNewsletterByIdController: RequestHandler = catchAsync(async (req, res) => {
  const result = await updateNewsletterByIdService(req.params.id, req.body);
  sendResponse(res, {
    status: 200,
    success: true,
    message: 'newsletter updated successfully',
    data: result,
  });
});

// delete Newsletter 

export const deleteNewsletterByIdController: RequestHandler = catchAsync(async (req, res) => {
  const result = await deleteNewsletterByIdService(req.params.id);
  sendResponse(res, {
    status: 200,
    success: true,
    message: 'newsletter deleted successfully',
    data: result,
  });
});


