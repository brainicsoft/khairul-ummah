// commitee.routes.ts

import { Router } from 'express';
import { createCommiteeController, deleteCommiteeByIdController, getAllCommiteeController, getAllRoleYpeController, updateCommiteeByIdController } from './commitee.controller';
import uploader from '../../utils/uploader/uploader';
import { formValidator } from '../../middlewares/formVaidator';
import auth from '../../middlewares/auth';

export const commiteeRoutes: Router = Router();

commiteeRoutes.get('/', getAllCommiteeController);
commiteeRoutes.post('/request',auth('admin'), uploader({ image: 'single' }),formValidator, createCommiteeController);
commiteeRoutes.delete('/:id',auth('admin'), deleteCommiteeByIdController);
commiteeRoutes.patch('/:id',auth('admin'), uploader({ image: 'single' }),formValidator, updateCommiteeByIdController);
commiteeRoutes.get('/roleType/all', getAllRoleYpeController);


  