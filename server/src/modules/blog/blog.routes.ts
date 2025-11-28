// blog.routes.ts

import { Router } from 'express';
import { createBlogController, deleteBlogByIdController, getAllBlogController, getBlogBySlugController, updateBlogByIdController } from './blog.controller';
import uploader from '../../utils/uploader/uploader';
import { formValidator } from '../../middlewares/formVaidator';
import auth from '../../middlewares/auth';

export const blogRoutes: Router = Router();

blogRoutes.get('/',getAllBlogController);
blogRoutes.post('/request',auth('admin'), uploader({ image: 'single' }),formValidator,createBlogController);
blogRoutes.delete('/:id',auth('admin'), deleteBlogByIdController);
blogRoutes.patch('/:id',auth('admin'),uploader({ image: 'single' }),formValidator, updateBlogByIdController);
blogRoutes.get('/:slug', getBlogBySlugController);

  