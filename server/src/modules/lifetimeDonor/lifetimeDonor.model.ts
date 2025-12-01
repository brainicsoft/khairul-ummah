// lifetimeDonor.model.ts

import { Schema, model } from 'mongoose';
import { ILifetimeDonor } from './lifetimeDonor.interface';

const lifetimeDonorSchema = new Schema<ILifetimeDonor>({
  email: {
    type: String,
    // required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    // required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  profession: {
    type: String,
    default: 'other',
    trim: true,
  },
  address: {
    type: String,
    default: 'other',
    trim: true,
  },
  message: {
    type: String,
    default: 'other',
    trim: true,
  },
  termsAccepted: {
    type: Boolean,
    // required: true,
  },
});


export const LifetimeDonor = model<ILifetimeDonor>('LifetimeDonor', lifetimeDonorSchema);
