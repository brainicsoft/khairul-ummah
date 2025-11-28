// activities.routes.ts

import { Router } from 'express';
import uploader from '../../utils/uploader/uploader';
import { formValidator } from '../../middlewares/formVaidator';
import { createActivitiesController, deleteActivitiesByIdController, getActivitiesBySlugController, getAllActivitiesController, updateActivitiesByIdController } from './activities.controller';
import auth from '../../middlewares/auth';

export const activitiesRoutes: Router = Router();

activitiesRoutes.get('/', getAllActivitiesController);
activitiesRoutes.post('/request',auth('admin'), uploader({ image: 'single' }), formValidator, createActivitiesController);
activitiesRoutes.patch('/:id',auth('admin'), uploader({ image: 'single' }), formValidator, updateActivitiesByIdController);
activitiesRoutes.delete('/:id',auth('admin'), deleteActivitiesByIdController);
activitiesRoutes.get('/:slug', getActivitiesBySlugController);

