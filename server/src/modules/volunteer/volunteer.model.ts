// volunteer.model.ts

  import { Schema, model } from 'mongoose';
import { IVolunteer } from './volunteer.interface';

const volunteerSchema = new Schema<IVolunteer>({
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


  export const Volunteer = model<IVolunteer>('Volunteer', volunteerSchema);

  