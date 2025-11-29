
  // Contact.controller.ts
  import { RequestHandler } from 'express';
  import {  sendResponse } from '../../utils/sendResponse';
  import { catchAsync } from '../../utils/catchAsync';
  import { 
  createContactService,
   getAllContactService ,
   getContactByIdService,
   updateContactByIdService,
   deleteContactByIdService
   } from './contact.service'; // Update with your service path

  export const createContactController: RequestHandler = catchAsync(async (req, res) => {
    const result = await createContactService(req.body);
    sendResponse(res, {
      status: 201,
      success: true,
      message: 'Successfully created contact',
      data: result,
    });
  });

  // Get All Contact 

    export const getAllContactController: RequestHandler = catchAsync(async (req, res) => {
    const result = await getAllContactService(req.query);
    sendResponse(res, {
      status: 200,
      success: true,
      message: 'contact retrived successfully',
      data: result,
    });
  });


  // Get single Contact 

    export const getContactByIdController: RequestHandler = catchAsync(async (req, res) => {
    const result = await getContactByIdService(req.params.id);
    sendResponse(res, {
      status: 200,
      success: true,
      message: 'contact retrived successfully',
      data: result,
    });
  });


  // update Contact 

    export const updateContactByIdController: RequestHandler = catchAsync(async (req, res) => {
    const result = await updateContactByIdService(req.params.id,req.body);
    sendResponse(res, {
      status: 200,
      success: true,
      message: 'contact updated successfully',
      data: result,
    });
  });

  // delete Contact 

    export const deleteContactByIdController: RequestHandler = catchAsync(async (req, res) => {
    const result = await deleteContactByIdService(req.params.id);
    sendResponse(res, {
      status: 200,
      success: true,
      message: 'contact deleted successfully',
      data: result,
    });
  });


  