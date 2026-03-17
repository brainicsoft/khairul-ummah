// autopay.model.ts

  import { Schema, model } from 'mongoose';
import { IAutopay } from './autopay.interface';

const autopaySchema = new Schema<IAutopay>({
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
});


  export const Autopay = model<IAutopay>('Autopay', autopaySchema);

  