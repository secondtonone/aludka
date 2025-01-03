import type { Transactions } from 'db';

export const getWinners = (transactions: Transactions) => transactions.filter(item => item.type === 'winner')
