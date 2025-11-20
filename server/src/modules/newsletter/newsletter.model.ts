// newsletter.model.ts

  import { Schema, model } from 'mongoose';
import { INewsletter } from './newsletter.interface';

const newsletterSchema = new Schema<INewsletter>({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },

});


  export const Newsletter = model<INewsletter>('Newsletter', newsletterSchema);

  