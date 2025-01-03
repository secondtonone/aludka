import z from 'zod';

export const winnerSchema = z
  .object({
    id: z.string().describe('oeopvpoelpvekeokoeoe'),
    amount: z.string().describe('2'),
    address: z.string().describe('QR7867fdfmdfkdmgkmgmfFFf67Ff67FFHFJFbbybdd'),
    currency: z.string().describe('TON'),
    type: z.string().describe('winner'),
    createdAd: z.number().describe('1734886849'),
    lt: z.string().describe('2489492204294'),
  });

export const winnersSchema =z.array(winnerSchema);

export type WinnerSchema = z.infer<typeof winnerSchema>;
export type WinnersSchema = z.infer<typeof winnersSchema>;

export type Transaction = Omit<WinnerSchema, 'id'>;

export type Transactions = Transaction[];
