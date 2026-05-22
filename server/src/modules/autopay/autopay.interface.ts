// autopay.model.ts
export interface IAutopay {
  name: string;
  phone: string;
  email?: string;

  // Gateway / metadata
  amount?: number;
  frequency?: string;
  paymentType?: string; // FIXED or FLEXIBLE
  payerType?: string; // CUSTOMER etc.
  serviceId?: number;
  merchantShortCode?: string;

  // state
  status?: 'initiate' | 'activated' | 'expired' | 'deactive';
  deductionFailureCount?: number;

  // bKash metadata wrapper
  metadata?: {
    bkash?: {
      subscriptionRequestId?: string;
      redirectURL?: string;
      expirationTime?: string | Date;
    };
    [key: string]: any;
  };

  // convenience top-level fields often stored alongside metadata
  subscriptionId?: string;
  subscriptionReference?: string;

  // scheduling / lifecycle timestamps
  startDate?: Date | string;
  endDate?: Date | string;
  lastRunAt?: Date | string;
  nextPaymentDate?: Date | string;
  nextRunAt?: Date | string;

  // raw gateway response or stored payload
  gatewayResponse?: any;

  createdAt?: Date;
  updatedAt?: Date;
}
