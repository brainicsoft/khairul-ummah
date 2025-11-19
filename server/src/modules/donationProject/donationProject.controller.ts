
// DonationProject.controller.ts
import { RequestHandler } from 'express';
import { sendResponse } from '../../utils/sendResponse';
import { catchAsync } from '../../utils/catchAsync';
import {
  createDonationProjectService,
  getAllDonationProjectService,
  getDonationProjectByIdService,
  updateDonationProjectByIdService,
  deleteDonationProjectByIdService,
  getDonationProjectBySlugService,
  getAllDonationSlugsService,
  getAllActiveDonationProjectService
} from './donationProject.service'; // Update with your service path
import { handleMulterUpload } from '../../utils/uploader/multerHandler';
import { DonationProject } from './donationProject.model';
import { generateSlug } from '../../utils/generateSlug';

export const createDonationProjectController: RequestHandler = catchAsync(async (req, res) => {
  // Parse JSON from form-data
  if (req.body.data) {
    req.body = JSON.parse(req.body.data);
  }
  let formattedData = req.body;
  // Handle file upload
  if (req.files) {
    const imageInfo: any = await handleMulterUpload(req.files);
    formattedData = {
      ...imageInfo,
      ...formattedData,
      user: (req.user as any)?.userId
    };
  }
  // Generate slug manually (Bangla + English)
  let baseSlug = generateSlug(formattedData.title);
  // Check for existing title
  const existingTitle = await DonationProject.findOne({ title: formattedData.title });
  if (existingTitle) {
    return sendResponse(res, {
      status: 409,
      success: false,
      message: "A project with this title already exists!",
    });
  }
  formattedData.slug = baseSlug;
  const result = await createDonationProjectService(formattedData);
  sendResponse(res, {
    status: 201,
    success: true,
    message: 'Successfully created donationProject',
    data: result,
  });
});



export const getAllDonationProjectController: RequestHandler = catchAsync(async (req, res) => {
  const {result,meta} = await getAllDonationProjectService(req.query);
  sendResponse(res, {
    status: 200,
    success: true,
    message: 'donationProject retrived successfully',
    data: result,
    meta: meta,
  });
});

export const getAllActiveDonationProjectController: RequestHandler = catchAsync(async (req, res) => {
  const { result, meta } = await getAllActiveDonationProjectService(req.query);
  sendResponse(res, {
    status: 200,
    success: true,
    message: 'donationProject retrived successfully',
    data: result,
    meta: meta,
  });
});


// Get single DonationProject 

export const getDonationProjectByIdController: RequestHandler = catchAsync(async (req, res) => {
  const result = await getDonationProjectByIdService(req.params.id);
  sendResponse(res, {
    status: 200,
    success: true,
    message: 'donationProject retrived successfully',
    data: result,
  });
});

// get donationProject by slug
export const getDonationProjectBySlugContoller: RequestHandler = catchAsync(async (req, res) => {
  const { slug } = req.params;
  const donationProject = await getDonationProjectBySlugService(slug);
  if (!donationProject) {
    sendResponse(res, {
      status: 404,
      success: false,
      message: 'donationProject not found',
      data: null,
    });
  }
  sendResponse(res, {
    status: 200,
    success: true,
    message: 'donationProject retrived successfully',
    data: donationProject,
  });
});


// update DonationProject 

export const updateDonationProjectByIdController: RequestHandler = catchAsync(async (req, res) => {
  let formattedData = req.body;

  if (req.files) {
    const imageInfo: any = await handleMulterUpload(req.files);
    formattedData = { ...imageInfo, ...req.body, user: (req.user as any)?.userId };
  }
  const result = await updateDonationProjectByIdService(req.params.id, formattedData);
  sendResponse(res, {
    status: 200,
    success: true,
    message: 'donationProject updated successfully',
    data: result,
  });
});

// delete DonationProject 

export const deleteDonationProjectByIdController: RequestHandler = catchAsync(async (req, res) => {
  const result = await deleteDonationProjectByIdService(req.params.id);
  sendResponse(res, {
    status: 200,
    success: true,
    message: 'donationProject deleted successfully',
    data: result,
  });
});

export const getAllDonationSlugsController: RequestHandler = async (req, res) => {
  try {
    const slugs = await getAllDonationSlugsService();
    res.status(200).json({
      success: true,
      data: slugs,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
