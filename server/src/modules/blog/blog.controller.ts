
  // Blog.controller.ts
  import { RequestHandler } from 'express';
  import {  sendResponse } from '../../utils/sendResponse';
  import { catchAsync } from '../../utils/catchAsync';
  import { 
  createBlogService,
   getAllBlogService ,
   getBlogByIdService,
   updateBlogByIdService,
   deleteBlogByIdService,
   getBlogBySlugService
   } from './blog.service'; // Update with your service path
import { Blog } from './blog.model';
import { generateSlug } from '../../utils/generateSlug';
import { handleMulterUpload } from '../../utils/uploader/multerHandler';

  export const createBlogController: RequestHandler = catchAsync(async (req, res) => {
    if(req.body.data){
      req.body = JSON.parse(req.body.data);
    }
    let formattedData = req.body;
    console.log("📦 Parsed Body:", formattedData);

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
    console.log("Initial slug:", baseSlug);

    // Check for existing title
    const existingTitle = await Blog.findOne({ title: formattedData.title });
    if (existingTitle) {
      return sendResponse(res, {
        status: 409,
        success: false,
        message: "A blog with this title already exists!",
      });
    }
    formattedData.slug = baseSlug;
    const result = await createBlogService(formattedData);
    sendResponse(res, {
      status: 201,
      success: true,
      message: 'Successfully created blog',
      data: result,
    });
  });

  // Get All Blog 

    export const getAllBlogController: RequestHandler = catchAsync(async (req, res) => {
    const result = await getAllBlogService(req.query);
    sendResponse(res, {
      status: 200,
      success: true,
      message: 'blog retrived successfully',
      data: result,
    });
  });


  // Get single Blog 

    export const getBlogByIdController: RequestHandler = catchAsync(async (req, res) => {
    const result = await getBlogByIdService(req.params.id);
    sendResponse(res, {
      status: 200,
      success: true,
      message: 'blog retrived successfully',
      data: result,
    });
  });
export const getBlogBySlugController: RequestHandler = catchAsync(async (req, res) => {
  const { slug } = req.params;
  const blog = await getBlogBySlugService(slug);
  if (!blog) {
    sendResponse(res, {
      status: 404,
      success: false,
      message: 'blog not found',
      data: null,
    });
  }
  sendResponse(res, {
    status: 200,
    success: true,
    message: 'blog retrived successfully',
    data: blog,
  });
});

  // update Blog 

    export const updateBlogByIdController: RequestHandler = catchAsync(async (req, res) => {
    const result = await updateBlogByIdService(req.params.id,req.body);
    sendResponse(res, {
      status: 200,
      success: true,
      message: 'blog updated successfully',
      data: result,
    });
  });

  // delete Blog 

    export const deleteBlogByIdController: RequestHandler = catchAsync(async (req, res) => {
    const result = await deleteBlogByIdService(req.params.id);
    sendResponse(res, {
      status: 200,
      success: true,
      message: 'blog deleted successfully',
      data: result,
    });
  });


  