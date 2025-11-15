import { z } from "zod";

export const updateUserValidation = z.object({
  body: z.object({
    name: z.string().optional(),
    username: z.string().optional(),
    email: z.string().email('Invalid email address').optional(),
    password: z.string().optional(),
    phone: z.string().optional(),
    address: z.string().optional(),
    role: z.enum(["user", "admin"]).optional(),
  }),
});
