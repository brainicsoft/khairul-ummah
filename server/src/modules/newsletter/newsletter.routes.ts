// newsletter.routes.ts

import { Router } from 'express';
import { createNewsletterController, deleteNewsletterByIdController, getAllNewsletterController, updateNewsletterByIdController } from './newsletter.controller';


export const newsletterRoutes: Router = Router();

newsletterRoutes.get('/',getAllNewsletterController);
newsletterRoutes.post('/request',createNewsletterController);
newsletterRoutes.delete('/:id',deleteNewsletterByIdController);
newsletterRoutes.patch('/:id',updateNewsletterByIdController);

  