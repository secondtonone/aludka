import { z } from 'zod';

const config = {
  tonCenterApiClient: process.env.TON_CENTER_API_CLIENT_KEY === 'undefined' ? '' : process.env.TON_CENTER_API_CLIENT_KEY,
  apiUrl: process.env.API_URL === 'undefined' ? '' : process.env.API_URL,
  webAppUrl: process.env.WEB_APP === 'undefined' ? '' : process.env.WEB_APP,
  contractId: process.env.CONTRACT_ADDRESS === 'undefined' ? '' : process.env.CONTRACT_ADDRESS,
  isTestnet: process.env.IS_TESTNET === undefined
  ? false
  : (process.env.IS_TESTNET as unknown as boolean),
};

const envSchema = z.object({
  apiUrl: z.string().min(1),
  tonCenterApiClient: z.string().min(1),
  webAppUrl: z.string().min(1),
  contractId: z.string().min(1),
  isTestnet: z.boolean(),
});

const env = envSchema.parse(config);

export default env;
