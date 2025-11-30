// massege.model.ts

  import { Schema, model } from 'mongoose';
import { IMassege } from './massege.interface';

const massegeSchema = new Schema<IMassege>({
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


  export const Massege = model<IMassege>('Massege', massegeSchema);

  