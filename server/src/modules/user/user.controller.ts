import { RequestHandler } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { getUserService, getMyDonationsService, updateMyProfileService, updateUserService, getSubscriptionDetailService, cancelSubscriptionDemoService } from './user.service';

export const getMyDonationsController: RequestHandler = catchAsync(
  async (req, res) => {
    const result = await getMyDonationsService((req as any).user.userId);

    sendResponse(res, {
      status: httpStatus.OK,
      success: true,
      message: 'Donations fetched successfully',
      data: result,
    });
  },
);

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
export const updateMyProfileController: RequestHandler = catchAsync(
  async (req, res) => {
    const result = await updateMyProfileService(
      (req as any).user.userId,
      req.body,
    );

    sendResponse(res, {
      status: httpStatus.OK,
      success: true,
      message: 'Profile updated successfully',
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

export const getSubscriptionDetailController: RequestHandler = catchAsync(
  async (req, res) => {
    const result = await getSubscriptionDetailService(
      (req as any).user.userId,
      req.params.id,
    );

    sendResponse(res, {
      status: httpStatus.OK,
      success: true,
      message: 'Subscription fetched successfully',
      data: result,
    });
  },
);

export const cancelSubscriptionDemoController: RequestHandler = catchAsync(
  async (req, res) => {
    const result = await cancelSubscriptionDemoService(
      (req as any).user.userId,
      req.params.id,
    );

    sendResponse(res, {
      status: httpStatus.OK,
      success: true,
      message: result.message,
      data: result,
    });
  },
);
