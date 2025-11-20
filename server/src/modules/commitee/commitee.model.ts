// commitee.model.ts

import { Schema, model } from 'mongoose';
import { ICommitee } from './commitee.interface';

const commiteeSchema = new Schema<ICommitee>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  slug: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    unique: true,
  },
  image: {
    type: String,
  },
  roleType: {
    type: String,
    required: true,
  },
  occupation: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
});


export const Commitee = model<ICommitee>('Commitee', commiteeSchema);

