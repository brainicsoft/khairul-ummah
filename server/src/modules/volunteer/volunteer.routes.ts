// volunteer.routes.ts

import { Router } from 'express';
import { createVolunteerController, deleteVolunteerByIdController, getAllVolunteerController } from './volunteer.controller';
import uploader from '../../utils/uploader/uploader';
import { formValidator } from '../../middlewares/formVaidator';

export const volunteerRoutes: Router = Router();

volunteerRoutes.get('/',getAllVolunteerController);
volunteerRoutes.post('/request',uploader({ avatar: 'single' }),formValidator,createVolunteerController);
volunteerRoutes.delete('/:id', deleteVolunteerByIdController);

  