// newsletter.routes.ts

import { Router } from 'express';
import { createNewsletterController, deleteNewsletterByIdController, getAllNewsletterController, updateNewsletterByIdController } from './newsletter.controller';
import auth from '../../middlewares/auth';


export const newsletterRoutes: Router = Router();

newsletterRoutes.get('/',auth('admin'), getAllNewsletterController);
newsletterRoutes.post('/request',createNewsletterController);
newsletterRoutes.delete('/:id',auth('admin'),deleteNewsletterByIdController);
newsletterRoutes.patch('/:id',updateNewsletterByIdController);

  