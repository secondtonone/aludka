import z from 'zod';
import { extendZodWithOpenApi } from 'zod-openapi';

extendZodWithOpenApi(z);

export const WinnerSchema =z.array(z
  .object({
    amount: z.number().openapi({
      example: 300,
    }),
    address: z.string().openapi({
      example: 'QR7867fdfmdfkdmgkmgmfFFf67Ff67FFHFJFbbybdd',
    }),
    currency: z.string().openapi({
      example: 'TON',
    }),
  }));

export const ErrorSchema = z.object({
  code: z.number().openapi({
    example: 400,
  }),
  message: z.string().openapi({
    example: 'Bad Request',
  }),
});
