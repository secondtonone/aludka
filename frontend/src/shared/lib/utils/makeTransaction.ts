import config from '@/config';
import { beginCell, toNano } from '@ton/ton';
import { type CHAIN, type TonConnectUI, UserRejectsError } from '@tonconnect/ui-react';

const getTonChainNet = () => (config.isTestnet ? '-3' : '-239') as CHAIN;

export const makeTransaction = async ({
    params,
    provider,
  }: {
    provider: TonConnectUI;
    params: {
      price: number;
      comment: string;
    },
  }) => {
    try {
      await provider.sendTransaction({
        validUntil: Math.floor(Date.now() / 1000) + 60, // 60 sec
        network: getTonChainNet(),
        messages: [
          {
            address: config.contractId,
            amount: `${toNano(params.price)}`,
            payload: beginCell()
              .storeUint(0, 32)
              .storeStringTail(params.comment)
              .endCell()
              .toBoc()
              .toString('base64'),
          },
        ],
      });
    } catch (e) {
      if (e instanceof UserRejectsError) {
        throw new Error('You rejected the transaction. Please confirm it to send to the blockchain');
      } else {
        throw new Error('Unknown error happened');
      }
    }
  };
