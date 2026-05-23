// massege.routes.ts

import { Router } from 'express';
import {
  createMassegeController,
  deleteMassegeByIdController,
  getAllMassegeController,
  getMassegeByIdController,
} from './massege.controller';
import { requestValidator } from '../../middlewares/requestValidator';
import { createMassegeValidationSchema } from './massege.validation';

export const massegeRoutes: Router = Router();

massegeRoutes.get('/', getAllMassegeController);
massegeRoutes.post(
  '/request',
  requestValidator(createMassegeValidationSchema),
  createMassegeController,
);
massegeRoutes.delete('/:id', deleteMassegeByIdController);
