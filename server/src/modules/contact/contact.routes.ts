// contact.routes.ts

import { Router } from 'express';
import { createContactController, getAllContactController } from './contact.controller';

export const contactRoutes: Router = Router();

contactRoutes.get('/', getAllContactController);
contactRoutes.post('/request', createContactController);

  