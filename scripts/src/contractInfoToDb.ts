import {
  connectToCluster,
  getContract,
  insertContracts,
  replaceContract,
} from 'db';
import {
  getContractInfo,
  getParticipantsCount,
  getTransactions,
  getWinners,
  tonClient,
} from 'ton-client';

const tonCenterApi = process.env.TON_CENTER_API_CLIENT_KEY || '';
const contractId = process.env.CONTRACT_ADDRESS || '';
const isTestnet = process.env.IS_TESTNET === 'true';
const mongoUri = process.env.DATABASE_URL || '';

const client = tonClient(tonCenterApi, isTestnet);

const main = async () => {
  const mongoClient = await connectToCluster(mongoUri);
  const contractInfo = await getContractInfo(client, contractId);
  const transactions = await getTransactions(client, contractId);

  const totalAmount = getWinners(transactions).reduce((acc, item) => {
    return acc + parseFloat(item.amount);
  }, 0);

  const totalPlayers = getParticipantsCount(transactions);

  const contractData = {
    ...contractInfo,
    contractId,
    totalPlayers,
    totalAmount: totalAmount.toString(),
  };

  const contract = await getContract({
    mongoClient,
    params: {
      contractId,
    },
  });

  if (contract) {
    await replaceContract({
      mongoClient,
      params: contractData,
    });
  } else {
    await insertContracts({
      mongoClient,
      contracts: [contractData],
    });
  }

  await mongoClient?.close();
};

main();
