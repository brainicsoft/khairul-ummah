// activities.model.ts

  import { Schema, model } from 'mongoose';
import { IActivities } from './activities.interface';

const activitiesSchema = new Schema<IActivities>({
  title: {
    type: String,
  },
  category: {
    type: String,
  },
   description: {
    type: String,
  },
 image: {
    type: String,
 },
 createdAt: {
    type: Date,
    default: Date.now,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
});


  export const Activities = model<IActivities>('Activities', activitiesSchema);

  