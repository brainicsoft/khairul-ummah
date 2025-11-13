// volunteer.routes.ts

import { Router } from 'express';
import { createVolunteerController } from './volunteer.controller';

export const volunteerRoutes: Router = Router();

volunteerRoutes.post('/request',createVolunteerController);

  