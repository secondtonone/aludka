import { connectToCluster } from '../db/connectToCluster';
import { getContract, insertContracts, replaceContract } from '../modules/contracts';
import client from '../ton/client';
import { getContractInfo } from '../ton/getContractInfo';
import { getTransactions } from '../ton/getTransactions';
import { getParticipantsCount } from '../ton/lib/getParticipantsCount';
import { getWinners } from '../ton/lib/getWinners';

const tonCenterApi = process.env.TON_CENTER_API_CLIENT_KEY || '';
const contractId = process.env.CONTRACT_ADDRESS || '';
const isTestnet = process.env.IS_TESTNET === 'true';
const mongoUri = process.env.DATABASE_URL || '';

const tonClient = client(tonCenterApi, isTestnet);

const main = async () => {
  const mongoClient = await connectToCluster(mongoUri);
  const contractInfo = await getContractInfo(tonClient, contractId);
  const transactions = await getTransactions(tonClient, contractId);

  const totalAmount = getWinners(transactions).reduce((acc, item) => {
    return acc + parseFloat(item.amount)
  },0);

  const totalPlayers = getParticipantsCount(transactions);

  const contractData = {
    ...contractInfo,
    contractId,
    totalPlayers,
    totalAmount: totalAmount.toString()
  };

  const contract = await getContract({
    mongoClient,
    params: {
      contractId
    }
  })

  if (contract) {
    await replaceContract({
      mongoClient,
      params: contractData
    })
  } else {
    await insertContracts({
      mongoClient,
      contracts: [contractData]
    })
  } 

  await mongoClient?.close();
}

main();
