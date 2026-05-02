// autopay.validation.ts

import { z } from 'zod';
export const autopayValidationSchema = z.object({
  body: z.object({
    amount: z.number().positive(),
    serviceId: z.number().int().positive().optional(),
    amountQueryUrl: z.string().optional(),
    firstPaymentAmount: z.number().positive().optional(),
    frequency: z.enum(['DAILY', 'WEEKLY', 'FIFTEEN_DAYS', 'THIRTY_DAYS', 'NINETY_DAYS', 'ONE_EIGHTY_DAYS', 'CALENDAR_MONTH', 'CALENDAR_YEAR']).optional(),
    startDate: z.string().optional(),
    expiryDate: z.string().optional(),
    payer: z.string().optional(),
    payerType: z.enum(['CUSTOMER', 'MERCHANT']).optional(),
    paymentType: z.enum(['FLEXIBLE', 'FIXED', 'MIXED']).optional(),
    subscriptionType: z.enum(['BASIC', 'WITH_PAYMENT', 'WITH_AUTH_CAPTURE']).optional(),
    firstPaymentIncludedInCycle: z.boolean().optional(),
    maxCapRequired: z.boolean().optional(),
    maxCapAmount: z.number().positive().optional(),
    redirectUrl: z.string().optional(),
    subscriptionReference: z.string().optional(),
    extraParams: z.record(z.string(), z.unknown()).optional(),
  }),
});

  