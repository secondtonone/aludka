import { TonClient } from '@ton/ton';

const tonClient = (apiKey: string, isTestnet = false) =>
  new TonClient({
    endpoint: isTestnet
      ? 'https://testnet.toncenter.com/api/v2/jsonRPC'
      : 'https://toncenter.com/api/v2/jsonRPC',
    apiKey,
  });

export default tonClient;
