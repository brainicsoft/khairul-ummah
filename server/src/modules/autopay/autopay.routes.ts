import { Router } from "express";
import {
  createAutopayController,
  bkashWebHookController
} from "./autopay.controller";

export const autopayRoutes: Router = Router();

// create a subscription
autopayRoutes.post("/bkash/create", createAutopayController);
// subscription validation
// subscription validation / webhook (support GET and POST)
autopayRoutes.get("/bkash/webhook", bkashWebHookController);
autopayRoutes.post("/bkash/webhook", bkashWebHookController);

export default autopayRoutes;

// autopay.routes.ts
