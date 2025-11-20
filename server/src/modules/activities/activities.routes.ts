// activities.routes.ts

import { Router } from 'express';
import uploader from '../../utils/uploader/uploader';
import { formValidator } from '../../middlewares/formVaidator';
import { createActivitiesController, deleteActivitiesByIdController, getAllActivitiesController, updateActivitiesByIdController } from './activities.controller';

export const activitiesRoutes: Router = Router();

activitiesRoutes.get('/demo', getAllActivitiesController);
activitiesRoutes.post('/request', uploader({ image: 'single' }), formValidator, createActivitiesController);
activitiesRoutes.patch('/:id', uploader({ image: 'single' }), formValidator, updateActivitiesByIdController);
activitiesRoutes.delete('/:id', deleteActivitiesByIdController);

