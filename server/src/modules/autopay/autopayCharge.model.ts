import { Schema, model } from 'mongoose';
import { IAutopayCharge } from './autopayCharge.interface';

const autopayChargeSchema = new Schema<IAutopayCharge>(
  {
    autopayId: {
      type: Schema.Types.ObjectId,
      ref: 'Autopay',
      required: true,
      index: true,
    },
    subscriptionId: {
      type: String,
      required: true,
      index: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    trxID: {
      type: String,
    },
    status: {
      type: String,
      enum: ['success', 'failed', 'pending'],
      default: 'success',
    },
    chargeType: {
      type: String,
      enum: ['first_payment', 'recurring', 'manual'],
      default: 'recurring',
    },
    gatewayResponse: {
      type: Schema.Types.Mixed,
    },
    chargedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);

export const AutopayCharge = model<IAutopayCharge>(
  'AutopayCharge',
  autopayChargeSchema,
);
