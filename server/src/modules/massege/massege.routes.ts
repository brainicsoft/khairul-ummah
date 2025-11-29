// massege.routes.ts

import { Router } from 'express';
import { createMassegeController, deleteMassegeByIdController, getAllMassegeController, getMassegeByIdController } from './massege.controller';


export const massegeRoutes: Router = Router();

massegeRoutes.get('/', getAllMassegeController);
massegeRoutes.post('/request',createMassegeController);
massegeRoutes.delete('/:id',deleteMassegeByIdController);

  