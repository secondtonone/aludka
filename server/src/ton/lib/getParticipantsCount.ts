import type { Transactions } from '../../schemas/winners';

export const getParticipantsCount = (transactions: Transactions) => transactions.findIndex((item) => item.type === 'winner');
