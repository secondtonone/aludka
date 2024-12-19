import z from 'zod';

export const winnerSchema =z.array(z
  .object({
    amount: z.number().describe('200'),
    address: z.string().describe('QR7867fdfmdfkdmgkmgmfFFf67Ff67FFHFJFbbybdd'),
    currency: z.string().describe('TON'),
  }));

export type WinnerSchema = z.infer<typeof winnerSchema>;
