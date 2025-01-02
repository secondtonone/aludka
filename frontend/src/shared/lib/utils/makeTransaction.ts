import { beginCell, toNano } from '@ton/ton';

import config from '@/config';
import type { CHAIN, TonConnectUI } from '@tonconnect/ui-react';

const getTonChainNet = () => (config.isTestnet ? '-3' : '-239') as CHAIN;

export const makeTransaction = async ({
    params,
    provider,
  }: {
    provider: TonConnectUI;
    params: {
      price: number;
      comment: string;
    }
  }) => {
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
  };
