
// DonationProject.controller.ts
import { RequestHandler } from 'express';
import { sendResponse } from '../../utils/sendResponse';
import { catchAsync } from '../../utils/catchAsync';
import {
  createDonationProjectService,
  getAllDonationProjectService,
  getDonationProjectByIdService,
  updateDonationProjectByIdService,
  deleteDonationProjectByIdService
} from './donationProject.service'; // Update with your service path
import { handleMulterUpload } from '../../utils/uploader/multerHandler';
import slugify from 'slugify';
import { DonationProject } from './donationProject.model';

// export const createDonationProjectController: RequestHandler = catchAsync(async (req, res) => {
//   let formattedData = req.body;
//   if (req.files) {
//     const imageInfo: any = await handleMulterUpload(req.files);
//     formattedData = { ...imageInfo, ...req.body, user: (req.user as any)?.userId };
//   }
//   const result = await createDonationProjectService(formattedData);
//   sendResponse(res, {
//     status: 201,
//     success: true,
//     message: 'Successfully created donationProject',
//     data: result,
//   });
// });

export const createDonationProjectController: RequestHandler = catchAsync(
  async (req, res) => {
    let formattedData = req.body;

    // Handle image upload
    if (req.files) {
      const imageInfo: any = await handleMulterUpload(req.files);
      formattedData = {
        ...imageInfo,
        ...req.body,
      };
    }

    // --- 🔥 Slug Generation From Title ---
    if (!formattedData.title) {
      throw new Error("Title is required to generate slug");
    }

    const existingProject = await DonationProject.findOne({
      title: formattedData.title,
    });

    let baseSlug = slugify(formattedData.title, {
      lower: true,
      strict: true,
    });

    if (existingProject) {
      baseSlug = `${baseSlug}-${Math.floor(Math.random() * 10000)}`;
    }

    // Ensure slug is set outside any condition
    formattedData.slug = baseSlug;

    // Save project
    const result = await createDonationProjectService(formattedData);

    sendResponse(res, {
      status: 201,
      success: true,
      message: "Successfully created donationProject",
      data: result,
    });
  }
);



// Get All DonationProject 

export const getAllDonationProjectController: RequestHandler = catchAsync(async (req, res) => {
  const result = await getAllDonationProjectService(req.query);
  sendResponse(res, {
    status: 200,
    success: true,
    message: 'donationProject retrived successfully',
    data: result,
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


