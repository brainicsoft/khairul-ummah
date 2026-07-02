import { Router } from 'express';
import {
  getUserController,
  getMyDonationsController,
  updateMyProfileController,
  getSubscriptionDetailController,
  cancelSubscriptionDemoController,
} from './user.controller';
import auth from '../../middlewares/auth';
import { requestValidator } from '../../middlewares/requestValidator';
import { updateMyProfileValidation } from './user.validation';

export const userRoutes: Router = Router();

userRoutes.get('/me', auth('admin', 'user', 'subadmin'), getUserController);
userRoutes.patch(
  '/me',
  auth('user', 'admin', 'subadmin'),
  requestValidator(updateMyProfileValidation),
  updateMyProfileController,
);
userRoutes.get(
  '/my-donations',
  auth('user', 'admin', 'subadmin'),
  getMyDonationsController,
);
userRoutes.get(
  '/subscriptions/:id',
  auth('user', 'admin', 'subadmin'),
  getSubscriptionDetailController,
);
userRoutes.post(
  '/subscriptions/:id/cancel-demo',
  auth('user', 'admin', 'subadmin'),
  cancelSubscriptionDemoController,
);
