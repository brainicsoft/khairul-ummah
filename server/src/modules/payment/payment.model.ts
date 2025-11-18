import { Schema, model } from "mongoose";
import { IPayment } from "./payment.interface";

const PaymentSchema = new Schema<IPayment>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: false,
      trim: true,
    },

    phone: {
      type: String,
    },

    amount: {
      type: Number,
      required: true,
    },
    paymentId: {
      type: String,
      required: true,
      unique:true
    },

    status: {
      type: String,
      enum: ["pending", "success", "failed"],
      default: "pending",
    },

    donationType: {
      type: String,
      required: true,
      trim: true,
    },
   method: {
      type:String,
      enum:["bkash","ssl-commerz"],
      default:'bkash',
    },

    donorMessage: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Payment = model<IPayment>("Payment", PaymentSchema);

export default Payment;
