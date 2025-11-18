// payment.routes.ts

import { Router } from 'express';
import { createPaymentController, verifyBkashController } from './payment.controller';

export const paymentRoutes: Router = Router();

paymentRoutes.post('/create',createPaymentController);
paymentRoutes.get('/verify',verifyBkashController)

  