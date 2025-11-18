// gallery.routes.ts

import { Router } from 'express';
import { createGalleryController, deleteGalleryByIdController, getAllGalleryController, updateGalleryByIdController } from './gallery.controller';
import { formValidator } from '../../middlewares/formVaidator';
import uploader from '../../utils/uploader/uploader';

export const galleryRoutes: Router = Router();

galleryRoutes.get('/', getAllGalleryController);
galleryRoutes.post('/request',uploader({ image: 'single' }),formValidator,createGalleryController);
galleryRoutes.delete('/:id',deleteGalleryByIdController);
galleryRoutes.patch('/:id',uploader({ image: 'single' }),formValidator,updateGalleryByIdController);
  
