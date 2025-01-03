import z from 'zod';

export const contractSchema = z
  .object({
    id: z.string().describe('vlplvplplplplpe'),
    contractId: z.string().describe('QR7867fdfmdfkdmgkmgmfFFf67Ff67FFHFJFbbybdd'),
    prizePercentage: z.string().describe('200'),
    round: z.number().describe('2'),
    commissionPercentage: z.string().describe('0.5'),
    entryFee: z.string().describe('100'),
    totalPlayers: z.number().describe('25'),
    totalAmount: z.string().describe('1000.00'),
    balance: z.string().describe('1000.00'),
  });

export type ContractSchema = z.infer<typeof contractSchema>;

export type ContractData = Omit<ContractSchema, 'id'>;
