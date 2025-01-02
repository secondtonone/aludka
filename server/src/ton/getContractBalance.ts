import { Address } from '@ton/core';
import { TonClient } from '@ton/ton';

export async function getContractBalance(
  tonClient: TonClient,
  contractAddress: string
) {
  let balance = 0n;

  const address = Address.parse(contractAddress);

  try {
    balance = await tonClient.getBalance(address);
  } catch (error) {
    console.log('Get balance error: ', error);
  }

  return balance.toString();
}
