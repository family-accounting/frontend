import { z } from 'zod';

export const createWalletSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
});

export const updateWalletSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
});
