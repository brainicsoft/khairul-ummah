// autopay.model.ts

import { Schema, model } from 'mongoose';
import { IAutopay } from './autopay.interface';

const autopaySchema = new Schema<IAutopay>(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    email: {
      type: String,
    },
    // Gateway / metadata
    amount: { type: Number },
    frequency: { type: String },
    paymentType: { type: String },
    payerType: { type: String },
    serviceId: { type: Number },
    merchantShortCode: { type: String },

    // state
    status: {
      type: String,
      enum: ['initiated', 'activated', 'expired', 'deactive', 'failed'],
      default: 'initiated',
    },
    deductionFailureCount: { type: Number, default: 0 },

    // bKash metadata wrapper
    metadata: {
      bkash: {
        subscriptionRequestId: { type: String },
        redirectURL: { type: String },
        expirationTime: { type: Date },
      },
    },

    // convenience top-level fields
    subscriptionId: { type: String },
    subscriptionReference: { type: String },

    // scheduling / lifecycle timestamps
    startDate: { type: Date },
    endDate: { type: Date },
    lastRunAt: { type: Date },
    nextPaymentDate: { type: Date },
    nextRunAt: { type: Date },

    gatewayResponse: { type: Schema.Types.Mixed },
  },
  { timestamps: true },
);

export const Autopay = model<IAutopay>('Autopay', autopaySchema);
