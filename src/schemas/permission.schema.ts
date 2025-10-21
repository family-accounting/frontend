import { z } from 'zod';

export const createAccountSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
});

export const updateAccountSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
});
