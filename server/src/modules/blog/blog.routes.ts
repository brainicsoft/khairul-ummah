// blog.routes.ts

import { Router } from 'express';
import { createBlogController, deleteBlogByIdController, getAllBlogController, getBlogBySlugController, updateBlogByIdController } from './blog.controller';
import uploader from '../../utils/uploader/uploader';
import { formValidator } from '../../middlewares/formVaidator';

export const blogRoutes: Router = Router();

blogRoutes.get('/',getAllBlogController);
blogRoutes.post('/request',uploader({ image: 'single' }),formValidator,createBlogController);
blogRoutes.delete('/:id',deleteBlogByIdController);
blogRoutes.patch('/:id',uploader({ image: 'single' }),formValidator, updateBlogByIdController);
blogRoutes.get('/:slug', getBlogBySlugController);

  