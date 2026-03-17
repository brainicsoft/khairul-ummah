export type Frequency = 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY';
export type PaymentType = 'FIXED' | 'VARIABLE';
export type PayerType = 'CUSTOMER' | 'MERCHANT' | 'ORGANIZATION';
export type SubscriptionStatus = 'ACTIVE' | 'PAUSED' | 'CANCELLED' | 'EXPIRED';

export interface IAutopay {
  name?: string;
  email?: string;
  phone?: string;
deductionFailureCount?: number; // count of consecutive deduction failures, useful for retry logic and status updates
  // core subscription fields
  amount: number; // amount in smallest currency unit or as agreed by app
  frequency: Frequency; // DAILY, WEEKLY, etc.
  paymentType: PaymentType; // FIXED or VARIABLE
  payerType: PayerType; // who pays / payer category
  subscriptionReference?: string; // optional reference from payment gateway
  // identification & status
  subscriptionId?: string; // internal subscription id
  status?: SubscriptionStatus; // subscription lifecycle status
  subscription_no?: string; // subscription number from gateway
  // schedule & run metadata
  startDate?: Date;
  endDate?: Date;
  nextRunAt?: Date;
  lastRunAt?: Date;
  nextPaymentDate: Date;

  // payment method / references
  paymentMethodId?: string; // reference to saved payment method

  // bookkeeping
  isActive?: boolean;
  metadata?: Record<string, any>;

  // timestamps
  createdAt?: Date;
  updatedAt?: Date;
}

  