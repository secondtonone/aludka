import TonWeb from 'tonweb';

const tonweb = new TonWeb(
  new TonWeb.HttpProvider('https://toncenter.com/api/v2/jsonRPC', {
    apiKey: process.env.TON_CENTER_API_CLIENT_KEY || '',
  })
);

export default tonweb;
