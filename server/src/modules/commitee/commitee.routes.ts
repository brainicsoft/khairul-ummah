// commitee.routes.ts

import { Router } from 'express';
import { createCommiteeController, deleteCommiteeByIdController, getAllCommiteeController, getAllRoleYpeController, updateCommiteeByIdController } from './commitee.controller';
import uploader from '../../utils/uploader/uploader';
import { formValidator } from '../../middlewares/formVaidator';

export const commiteeRoutes: Router = Router();

commiteeRoutes.get('/', getAllCommiteeController);
commiteeRoutes.post('/request',uploader({ image: 'single' }),formValidator, createCommiteeController);
commiteeRoutes.delete('/:id', deleteCommiteeByIdController);
commiteeRoutes.patch('/:id',uploader({ image: 'single' }),formValidator, updateCommiteeByIdController);
commiteeRoutes.get('/roleType/all', getAllRoleYpeController);

  