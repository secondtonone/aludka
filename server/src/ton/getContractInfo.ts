import { Address, fromNano } from '@ton/core';
import { TonClient } from '@ton/ton';
import { ContractData } from 'src/schemas/contract';
import { getContractBalance } from './getContractBalance';
import { contractMethods } from './lib/contractMethods';
import { executeMethod } from './lib/executeMethod';

export async function getContractInfo(
  tonClient: TonClient,
  contractAddress: string
) {
  let info = {} as Omit<ContractData, 'contractId' | 'totalPlayers'>;

  const address = Address.parse(contractAddress);

  try {
    const [round, entryFee, commissionPercentage, prizePercentage, balance] =
      await Promise.all([
        ...contractMethods.map((method) => executeMethod(tonClient, address, method)),
        getContractBalance(tonClient, contractAddress),
      ]);

    info = {
      ...info,
      round: (round as number) + 1,
      entryFee: fromNano(entryFee),
      commissionPercentage: fromNano(commissionPercentage),
      prizePercentage: fromNano(prizePercentage),
      balance: fromNano(balance)
    };
  } catch (error) {
    console.log('Get info error: ', error);
  }

  return info;
}