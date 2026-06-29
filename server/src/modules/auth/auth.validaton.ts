import { z } from 'zod';

/**
 * Create User Validation - Zod v4+
 */
export const createUserValidation = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required'), // replaces required_error

    username: z.string().min(1, 'Username is required'), // replaces required_error

    email: z
      .string()
      .min(1, 'Email is required')
      .email('Invalid email address'),

    googleId: z.string().optional(),

    password: z.string().min(6, 'Password must be at least 6 characters'),

    role: z.enum(['user', 'admin']).default('user'),
  }),
});

/**
 * Activate User Validation
 */
export const activateUserValidation = z.object({
  body: z.object({
    activationToken: z.string().min(1, 'Token is required'),

    code: z.string().min(1, 'Code is required'),
  }),
});

/**
 * Login Validation
 */
export const loginValidation = z.object({
  body: z.object({
    email: z.string().min(1, 'Email or phone is required'),

    password: z.string().min(6, 'Password must be at least 6 characters'),
  }),
});

export const checkPhoneValidation = z.object({
  query: z.object({
    phone: z.string().min(10, 'Phone is required'),
  }),
});

export const donorRegisterValidation = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required'),
    phone: z.string().min(10, 'Phone is required'),
    email: z.string().email('Invalid email address').optional().or(z.literal('')),
    password: z.string().min(6, 'Password must be at least 6 characters'),
  }),
});
