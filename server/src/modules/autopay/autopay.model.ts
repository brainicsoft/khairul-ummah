// autopay.model.ts

import { Schema, model, Types } from 'mongoose';
import { IAutopay } from './autopay.interface';

const autopaySchema = new Schema<IAutopay>(
  {
    email: {
      type: String,
    },
    name: {
      type: String,
    },
    phone: {
      type: String,
    },

    // core subscription fields
    amount: {
      type: Number,
      required: true,
    },
    frequency: {
      type: String,
      enum: ['DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY'],
      required: true,
    },
    paymentType: {
      type: String,
      enum: ['FIXED', 'VARIABLE'],
      required: true,
    },
    payerType: {
      type: String,
      enum: ['CUSTOMER', 'MERCHANT', 'ORGANIZATION'],
      required: true,
    },

    // identification & status
    subscriptionId: {
      type: String,
      index: true,
    },
    status: {
      type: String,
      enum: ['ACTIVE', 'PAUSED', 'CANCELLED', 'EXPIRED','PENDING'],
      default: 'PENDING',
    },

    // schedule & run metadata
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    nextRunAt: {
      type: Date,
    },
    lastRunAt: {
      type: Date,
    },

    // payment method / references
    paymentMethodId: {
      type: String,
    },

    // bookkeeping
    // createdBy removed: system works without login
    isActive: {
      type: Boolean,
      default: true,
    },
    metadata: {
      type: Schema.Types.Mixed,
    },
  },
  {
    timestamps: true,
  }
);

autopaySchema.index({ subscriptionId: 1 });

export const Autopay = model<IAutopay>('Autopay', autopaySchema);

  