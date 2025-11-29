// contact.model.ts

import { Schema, model } from 'mongoose';
import { IContact } from './contact.interface';

const contactSchema = new Schema<IContact>({
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  message: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    default: 'Contact Form Submission',
    trim: true,
  },
  
});


export const Contact = model<IContact>('Contact', contactSchema);

