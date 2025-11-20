
// Commitee.controller.ts
import { RequestHandler } from 'express';
import { sendResponse } from '../../utils/sendResponse';
import { catchAsync } from '../../utils/catchAsync';
import {
  createCommiteeService,
  getAllCommiteeService,
  getCommiteeByIdService,
  updateCommiteeByIdService,
  deleteCommiteeByIdService,
  getAllRoleTypeMembersService
} from './commitee.service'; // Update with your service path
import { handleMulterUpload } from '../../utils/uploader/multerHandler';
import { generateSlug } from '../../utils/generateSlug';

export const createCommiteeController: RequestHandler = catchAsync(async (req, res) => {
  let formattedData = req.body;
  if (req.files) {
    const imageInfo: any = await handleMulterUpload(req.files);
    formattedData = { ...imageInfo, ...req.body, user: (req.user as any)?.userId };
  }

  // Generate slug manually (Bangla + English)
  let baseSlug = generateSlug(formattedData.name);
  formattedData.slug = baseSlug;
  const result = await createCommiteeService(formattedData);
  sendResponse(res, {
    status: 201,
    success: true,
    message: 'Successfully created commitee',
    data: result,
  });
});

// Get All Commitee 
export const getAllCommiteeController: RequestHandler = catchAsync(async (req, res) => {
  const {result,meta} = await getAllCommiteeService(req.query);
  sendResponse(res, {
    status: 200,
    success: true,
    message: 'commitee retrived successfully',
    data: result,
    meta: meta,
  });
});


// Get single Commitee 

export const getCommiteeByIdController: RequestHandler = catchAsync(async (req, res) => {
  const result = await getCommiteeByIdService(req.params.id);
  sendResponse(res, {
    status: 200,
    success: true,
    message: 'commitee retrived successfully',
    data: result,
  });
});


// update Commitee 

export const updateCommiteeByIdController: RequestHandler = catchAsync(async (req, res) => {
  let formattedData = req.body;

  if (req.files) {
    const imageInfo: any = await handleMulterUpload(req.files);
    formattedData = { ...imageInfo, ...req.body, user: (req.user as any)?.userId };
  }
  const result = await updateCommiteeByIdService(req.params.id, formattedData);
  sendResponse(res, {
    status: 200,
    success: true,
    message: 'commitee updated successfully',
    data: result,
  });
});

// delete Commitee 

export const deleteCommiteeByIdController: RequestHandler = catchAsync(async (req, res) => {
  const result = await deleteCommiteeByIdService(req.params.id);
  sendResponse(res, {
    status: 200,
    success: true,
    message: 'commitee deleted successfully',
    data: result,
  });
});


export const getAllRoleYpeController: RequestHandler = async (req, res) => {
  try {
    const roleTypeMembers = await getAllRoleTypeMembersService();
    res.status(200).json({
      success: true,
      data: roleTypeMembers,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
