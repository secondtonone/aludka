import {
  connectToCluster,
  getWinners as getDBWinners,
  insertWinners
} from 'db';

import {
  getTransactions,
  getWinners,
  tonClient
} from 'ton-client';

export const transactionsToDb = async (env: Record<string, string>) => {
  const tonCenterApi = env.TON_CENTER_API_CLIENT_KEY || '';
  const contractId = env.CONTRACT_ADDRESS || '';
  const isTestnet = env.IS_TESTNET === 'true';
  const mongoUri = env.DATABASE_URL || '';

  const client = tonClient(tonCenterApi, isTestnet);
  const mongoClient = await connectToCluster(mongoUri);

  const prevWinners = await getDBWinners({ mongoClient, limit: 1 });

  const lastWinner = prevWinners && prevWinners[0] ? prevWinners[0] : null;

  const transactions = await getTransactions(client, contractId, lastWinner ? {
    to_lt: lastWinner.lt
  } : undefined);

  const winners = getWinners(transactions);

  if (winners.length > 0) {
    await insertWinners({
      winners,
      mongoClient
    })
  }

  await mongoClient?.close();
}
