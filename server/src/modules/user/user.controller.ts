import { RequestHandler } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { getUserService, updateUserService } from './user.service';

export const getUserController: RequestHandler = catchAsync(
  async (req, res) => {
  
    const result = await getUserService((req as any).user.userId);
    sendResponse(res, {
      status: httpStatus.OK,
      success: true,
      message: 'User fetched successfully',
      data: result,
    });
  },
);
export const updateUserController: RequestHandler = catchAsync(
  async (req, res) => {
    const result = await updateUserService((req as any).user.userId, req.body);
    sendResponse(res, {
      status: httpStatus.OK,
      success: true,
      message: 'User Updated successfully',
      data: result,
    });
  },
);
