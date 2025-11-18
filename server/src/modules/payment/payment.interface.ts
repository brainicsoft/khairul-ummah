export interface IPayment extends Document {
  name: string;
  email: string;
  phone?: string;
  amount: number;
  trxID: string;
  paymentId?: string;
  method:string
  status: "pending" | "success" | "failed";
  donationType:string;
  donorMessage?: string;
  createdAt: Date;
  updatedAt: Date;
}