// lifetimeDonor.routes.ts

import { Router } from 'express';
import {  createLifetimeDonorController, deleteLifetimeDonorByIdController, getAllLifetimeDonorController, updateLifetimeDonorByIdController } from './lifetimeDonor.controller';

export const lifetimeDonorRoutes: Router = Router();

lifetimeDonorRoutes.get('/',getAllLifetimeDonorController);
lifetimeDonorRoutes.post('/request',createLifetimeDonorController);
lifetimeDonorRoutes.patch('/:id',updateLifetimeDonorByIdController);
lifetimeDonorRoutes.delete('/:id',deleteLifetimeDonorByIdController);

  