import { Types } from 'mongoose';

export interface IAutopayCharge {
  autopayId: Types.ObjectId | string;
  subscriptionId: string;
  amount: number;
  trxID?: string;
  status?: 'success' | 'failed' | 'pending';
  chargeType?: 'first_payment' | 'recurring' | 'manual';
  gatewayResponse?: unknown;
  chargedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
