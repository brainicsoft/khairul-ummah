// payment.routes.ts

import { Router } from 'express';
import { createPaymentController, getAllPaymentController, getPaymentSummaryController, verifyBkashController } from './payment.controller';
import axios from 'axios';
import { generateBkashAutopayHeaders, getBkashIdToken } from '../paymentGetway/bkash.service';
import { baseUrl, bkashKey, bkashSecret, bkashUrl } from '../../config';

export const paymentRoutes: Router = Router();

paymentRoutes.post('/create',createPaymentController);
paymentRoutes.get('/verify',verifyBkashController)
paymentRoutes.get('/',getAllPaymentController)
paymentRoutes.get('/summary',getPaymentSummaryController)

// paymentRoutes.get("/autopay", async (req, res) => {
//   try {
//     const body = {
//       payerReference: "125436",
//       amount: 10,
//       interval: "DAILY",
//       currency: "BDT",
//       callbackURL: `${baseUrl}/autopay/execute`,
//     };

//     const headers = await generateBkashAutopayHeaders(
//       "POST",
//       "/autopay/mandate/create",
//       body,
//       bkashKey,
//       bkashSecret,
//       bkashUrl
//     );

//     const { data: autopayData } = await axios.post(`${bkashUrl}/autopay/mandate/create`, body, { headers });

//     return res.json(autopayData);
//   } catch (error: any) {
//     console.error("Autopay mandate error:", error.response?.data || error.message);
//     return res.status(500).json({ message: "Failed to create autopay mandate" });
//   }
// });
