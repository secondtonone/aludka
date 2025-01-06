import {
  connectToCluster,
  type ContractData,
  getContract,
  insertContracts,
  replaceContract
} from 'db';
import {
  getContractInfo,
  getParticipantsCount,
  getTransactions,
  getWinners,
  tonClient,
} from 'ton-client';

export const contractInfoToDb = async (env: Record<string, string>) => {
  const tonCenterApi = env.TON_CENTER_API_CLIENT_KEY || '';
  const contractId = env.CONTRACT_ADDRESS || '';
  const isTestnet = env.IS_TESTNET === 'true';
  const mongoUri = env.DATABASE_URL || '';

  const client = tonClient(tonCenterApi, isTestnet);
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
    if (
      !(Object.keys(contractData) as Array<keyof ContractData>).every(
        (key) => contract[key] == contractData[key]
      )
    ) {
      await replaceContract({
        mongoClient,
        params: contractData,
      });
    }
  } else {
    await insertContracts({
      mongoClient,
      contracts: [contractData],
    });
  }

  await mongoClient?.close();
};
