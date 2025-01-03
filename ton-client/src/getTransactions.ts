import { Address, fromNano, TonClient } from '@ton/ton';
import type { Transactions } from 'db';
import {
  type Comments,
  commentsMap,
  winTransactionComment,
} from './lib/comments';

export async function getTransactions(
  tonClient: TonClient,
  contractAddress: string,
  opt:
    | {
        limit?: number;
        lt?: string;
        hash?: string;
        to_lt?: string;
        inclusive?: boolean;
        archival?: boolean;
      }
    | undefined = {}
) {
  let transactions = [] as Transactions;

  const address = Address.parse(contractAddress);

  try {
    const result = await tonClient.getTransactions(address, {
      limit: 1000,
      archival: true,
      ...opt,
    });

    transactions = result
      .filter((transaction) => transaction
        .outMessages.values().length !== 0)
      .map((transaction) => {
        const inMsg = transaction.inMessage;
        const originalBody = inMsg?.body.beginParse();
        let body = originalBody?.clone();

        if (inMsg?.info.type == 'internal') {
          let amount = inMsg?.info?.value
            ? fromNano(inMsg?.info?.value.coins)
            : '0';

          const comment = (
            body?.loadUint(32) == 0
              ? body?.loadStringTail()
              : originalBody?.loadUint(32).toString()
          ) as Comments;

          if (comment == winTransactionComment) {
            const outMsg = transaction.outMessages.values();

            amount = outMsg.map((message) =>
              message?.info.type == 'internal' && message?.info?.value
                ? fromNano(message?.info?.value.coins)
                : '0'
            )[0];
          }

          return {
            address: transaction.hash().toString('hex'),
            amount,
            type: commentsMap[comment],
            createdAd: transaction.now,
            currency: 'TON',
            lt: transaction.lt.toString(),
          };
        } else {
          return {
            address: transaction.hash().toString('hex'),
            createdAd: transaction.now,
            lt: transaction.lt.toString(),
            amount: '0',
            currency: 'TON',
            type: '',
          };
        }
      });
  } catch (error) {
    console.log('Transactions error: ', error);
  }

  return transactions;
}
