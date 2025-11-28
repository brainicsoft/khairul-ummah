// donationProject.routes.ts

import { Router } from 'express';
import { createDonationProjectController, deleteDonationProjectByIdController, getAllActiveDonationProjectController, getAllDonationProjectController, getAllDonationSlugsController, getDonationProjectBySlugContoller, updateDonationProjectByIdController } from './donationProject.controller';
import { formValidator } from '../../middlewares/formVaidator';
import uploader from '../../utils/uploader/uploader';
import auth from '../../middlewares/auth';

export const donationProjectRoutes: Router = Router();

donationProjectRoutes.get('/',  getAllDonationProjectController);
donationProjectRoutes.get('/slug/all', getAllDonationSlugsController);
donationProjectRoutes.get('/active', getAllActiveDonationProjectController);
donationProjectRoutes.post('/request', uploader({ image: 'single' }), formValidator, createDonationProjectController);
donationProjectRoutes.delete('/:id', auth('admin'), deleteDonationProjectByIdController);
donationProjectRoutes.patch('/:id', auth('admin'), uploader({ image: 'single' }), formValidator, updateDonationProjectByIdController);
donationProjectRoutes.get('/:slug', getDonationProjectBySlugContoller);

