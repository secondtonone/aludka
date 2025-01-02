import { connectToCluster } from '../db/connectToCluster';
import { getWinners as getDBWinners, insertWinners } from '../modules/winners';
import client from '../ton/client';
import { getTransactions } from '../ton/getTransactions';
import { getWinners } from '../ton/lib/getWinners';

const tonCenterApi = process.env.TON_CENTER_API_CLIENT_KEY || '';
const contractId = process.env.CONTRACT_ADDRESS || '';
const isTestnet = process.env.IS_TESTNET === 'true';
const mongoUri = process.env.DATABASE_URL || '';

const tonClient = client(tonCenterApi, isTestnet);

const main = async () => {
  const mongoClient = await connectToCluster(mongoUri);

  const prevWinners = await getDBWinners({ mongoClient, limit: 1 });

  const lastWinner = prevWinners && prevWinners[0] ? prevWinners[0] : null;

  const transactions = await getTransactions(tonClient, contractId, lastWinner ? {
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

main();
