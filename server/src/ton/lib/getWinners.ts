import type { Transactions } from '../../schemas/winners';

export const getWinners = (transactions: Transactions) => transactions.filter(item => item.type === 'winner')
