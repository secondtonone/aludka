import type { Transactions } from 'db';

export const getParticipantsCount = (transactions: Transactions) => transactions.findIndex((item) => item.type === 'winner');
