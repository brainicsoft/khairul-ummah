// donationProject.routes.ts

import { Router } from 'express';
import { createDonationProjectController, deleteDonationProjectByIdController, getAllActiveDonationProjectController, getAllDonationProjectController, getAllDonationSlugsController, getDonationProjectBySlugContoller, updateDonationProjectByIdController } from './donationProject.controller';
import { formValidator } from '../../middlewares/formVaidator';
import uploader from '../../utils/uploader/uploader';

export const donationProjectRoutes: Router = Router();

donationProjectRoutes.get('/',getAllDonationProjectController);
donationProjectRoutes.get('/active',getAllActiveDonationProjectController);
donationProjectRoutes.post('/request',uploader({ image: 'single' }),formValidator,createDonationProjectController);
donationProjectRoutes.delete('/:id',deleteDonationProjectByIdController);
donationProjectRoutes.patch('/:id',uploader({ image: 'single' }),formValidator,updateDonationProjectByIdController);
donationProjectRoutes.get('/:slug',getDonationProjectBySlugContoller);
donationProjectRoutes.get('/slug/all',getAllDonationSlugsController);

  