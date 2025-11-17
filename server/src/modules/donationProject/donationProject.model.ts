// donationProject.model.ts

import { Schema, model } from "mongoose";
import { IDonationProject } from "./donationProject.interface";

const donationProjectSchema = new Schema<IDonationProject>(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    desc: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ["general", "special", "emergency"],
      required: true,
    },
    benefits: {
      type: [String],
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "active", "completed"],
      default: "pending",
    },

    videoUrl: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
  
);

export const DonationProject = model<IDonationProject>(
  "DonationProject",
  donationProjectSchema
);
