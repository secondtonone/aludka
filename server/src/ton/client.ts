// import TonWeb from 'tonweb';
import { TonClient } from "@ton/ton";

const tonClient = (apiKey: string, isTestnet = false) => 
  /* new TonWeb.HttpProvider(isTestnet ? 'https://testnet.toncenter.com/api/v2/jsonRPC' : 'https://toncenter.com/api/v2/jsonRPC', {
    apiKey
  }); */
  new TonClient({
    endpoint: isTestnet ? 'https://testnet.toncenter.com/api/v2/jsonRPC' : 'https://toncenter.com/api/v2/jsonRPC',
    apiKey
  });

export default tonClient;
