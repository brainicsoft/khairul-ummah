import { z } from 'zod';

export const createMassegeValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required').trim(),
    email: z.string().email('Invalid email'),
    phone: z.string().min(6, 'Phone is required').trim(),
    subject: z.string().min(1, 'Subject is required').trim(),
    message: z.string().min(1, 'Message is required').trim(),
  }),
});
