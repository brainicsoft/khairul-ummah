import { model, Schema } from "mongoose"
import { IVolunteer } from "./volunteer.interface"

const volunteerSchema = new Schema<IVolunteer>(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    fatherName: {
      type: String,
      required: true,
      trim: true,
    },
    NidNo: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    mobileNumber: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    avatar: {
      type: String,
    },

    birthDate: {
      type: Date,
      required: true,
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    presentAddress: {
      type: String,
      required: true,
      trim: true,
    },
    permanentAddress: {
      type: String,
      required: true,
      trim: true,
    },
    currentProfession: {
      type: String,
      required: true,
      trim: true,
    },
    organizationName: {
      type: String,
      trim: true,
    },
    workAddress: {
      type: String,
      trim: true,
    },
    educationQualification: {
      type: String,
      required: true,
      trim: true,
    },
    interestReason: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
)

export const Volunteer = model<IVolunteer>('Volunteer', volunteerSchema)