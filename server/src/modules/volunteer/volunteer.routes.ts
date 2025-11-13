// volunteer.routes.ts

import { Router } from 'express';
import { createVolunteerController } from './volunteer.controller';
import uploader from '../../utils/uploader/uploader';
import { formValidator } from '../../middlewares/formVaidator';

export const volunteerRoutes: Router = Router();

volunteerRoutes.post('/request',uploader({ avatar: 'single' }),formValidator,createVolunteerController);

  