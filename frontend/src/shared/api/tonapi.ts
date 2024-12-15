import { TonApiClient } from '@ton-api/client';

// Initialize the TonApi
const ta = new TonApiClient({
  baseUrl: 'https://tonapi.io',
  apiKey: process.env.TON_API_CLIENT_KEY || '',
});

export default ta;
