import { TransactionTypeEnum } from '@/enums';
import { z } from 'zod';
import { IdSchema } from '.';

export const createTransactionSchema = z.object({
  title: z.string(),
  description: z.string(),
  type: z.enum(TransactionTypeEnum),
});
export const updateTransactionSchema = createTransactionSchema.extend({
  id: IdSchema,
});
