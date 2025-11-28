// volunteer.routes.ts

import { Router } from 'express';
import { createVolunteerController, deleteVolunteerByIdController, getAllVolunteerController, updateVolunteerByIdController } from './volunteer.controller';
import uploader from '../../utils/uploader/uploader';
import { formValidator } from '../../middlewares/formVaidator';
import auth from '../../middlewares/auth';

export const volunteerRoutes: Router = Router();

volunteerRoutes.get('/', getAllVolunteerController);
volunteerRoutes.post('/request', auth('admin'), uploader({ avatar: 'single' }), formValidator, createVolunteerController);
volunteerRoutes.delete('/:id', auth('admin'), deleteVolunteerByIdController);
volunteerRoutes.patch('/:id', uploader({ avatar: 'single' }), formValidator, auth('admin'), updateVolunteerByIdController);

