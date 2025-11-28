// gallery.routes.ts

import { Router } from 'express';
import { createGalleryController, deleteGalleryByIdController, getAllGalleryController, updateGalleryByIdController } from './gallery.controller';
import { formValidator } from '../../middlewares/formVaidator';
import uploader from '../../utils/uploader/uploader';
import auth from '../../middlewares/auth';

export const galleryRoutes: Router = Router();

galleryRoutes.get('/', getAllGalleryController);
galleryRoutes.post('/request',auth('admin'), uploader({ image: 'single' }),formValidator,createGalleryController);
galleryRoutes.delete('/:id',auth('admin'), deleteGalleryByIdController);
galleryRoutes.patch('/:id',auth('admin'), uploader({ image: 'single' }),formValidator,updateGalleryByIdController);
  
