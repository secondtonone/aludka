import {
  Avatar,
  Cell,
  List,
  Navigation,
  Placeholder,
  Section,
  Text,
  Title,
} from '@telegram-apps/telegram-ui';
import {
  TonConnectButton,
  useTonAddress,
  useTonWallet
} from '@tonconnect/ui-react';
import { useEffect, useState, type FC } from 'react';

import { Page } from '@/app/layouts/Page';
import { DisplayData } from '@/shared/ui/DisplayData/DisplayData';

import './TONConnectPage.css';

import ta from '@/shared/api/tonapi';
import tonweb from '@/shared/api/tonweb';
import { AccountEvent, NftItem as HelpersNftItem } from '@ton-api/client';
// @ts-expect-error Expect error
import { NftItem, Address as SDKAdress } from '@ton-community/assets-sdk';
import { Address } from '@ton/core';

// Use the API
/* async function fetchAccountEvents(userAddress: string) {
    const address = Address.parse(userAddress);
    const events = await ta.accounts.getAccountEvents(address, { limit: 50 })
    console.log(events);
    return events.events;
} */

async function getNFTData(nftAddress: string) {
  try
  {
    const nftItem = new NftItem(nftAddress as SDKAdress);

    // const nft = await nftItem.getContent(tonweb);
    // @ts-expect-error Expect error
    const nft = await nftItem.getData(tonweb);

    console.log(nft);

    return nft;

    /* try {
            const { stack } = await tonweb.provider.call2(nftAddress, 'get_nft_data');
            console.log('NFT Content:', stack.readCellOpt());
            return content;
        } catch (error) {
            console.error(`Error fetching content for ${nftAddress}:`, error.message);
            return null;
        }
     */
  } catch (error)
  {
    return null;
  }
}

async function fetchAccountEvents(userAddress: string) {
  // const address = Address.parse(userAddress);
  const transactions = await tonweb.getTransactions(userAddress, 50);
  console.log(transactions);
  // const events = await ta.accounts.getAccountEvents(address, { limit: 50 })
  const nftContracts = new Set();

  for (const tx of transactions)
  {
    // Проверяем исходящие сообщения
    if (tx.in_msg.source)
    {
      nftContracts.add(tx.in_msg.source);
    }
  }

  const nftInfos = [];
  for (const nftAddress of nftContracts)
  {
    const nftData = await getNFTData(nftAddress as string);
    if (nftData)
    {
      nftInfos.push({ address: nftAddress, ...nftData });
    }
  }

  console.log('nfts: ', nftInfos);

  return nftInfos;
}

async function fetchAccountNfts(userAddress: string) {
  const address = Address.parse(userAddress);

  const nfts = await ta.accounts.getAccountNftItems(address, { limit: 50 });

  return nfts.nftItems;
}

export const TONConnectPage: FC = () => {
  const wallet = useTonWallet();
  const userFriendlyAddress = useTonAddress();
  const [events, setEvents] = useState<AccountEvent[]>([]);
  // @ts-expect-error Expect error
  const [nfts, setNfts] = useState<HelpersNftItem[]>([]);

  useEffect(() => {

    const handler = async () => {
      // create a new instance of TonConnectUI
      /* const provider = new TonConnectUI();
      // create a new instance of TonConnectProvider
      const sender = new TonConnectSender(provider);

      const api = await createApi('mainnet');

      const sdk = await AssetsSDK.create({
        sender,
        api
      }); */

      const event = await fetchAccountEvents(userFriendlyAddress);
      // @ts-expect-error Expect error
      setEvents(event);
    };

    const nftHandler = async () => {
      const event = await fetchAccountNfts(userFriendlyAddress);
      setNfts(event);
    };

    if (userFriendlyAddress)
    {
      handler();
      nftHandler();
    }
  }, [userFriendlyAddress]);

  if (!wallet)
  {
    return (
      <Page>
        <Placeholder
          header="TON Connect"
          description={
            <>
              <Text>
                To display the data related to the TON Connect, it is required
                to connect your wallet
              </Text>
              <TonConnectButton className="ton-connect-page__button" />
            </>
          }
        />
      </Page>
    );
  }

  const {
    account: { chain, publicKey, address },
    device: { appName, appVersion, maxProtocolVersion, platform, features },
  } = wallet;

  return (
    <Page>
      <List>
        {'imageUrl' in wallet && (
          <>
            <Section>
              <Cell
                before={
                  <Avatar
                    src={wallet.imageUrl}
                    alt="Provider logo"
                    width={60}
                    height={60}
                  />
                }
                after={<Navigation>About wallet</Navigation>}
                subtitle={wallet.appName}
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = wallet.aboutUrl;
                }}
              >
                <Title level="3">{wallet.name}</Title>
              </Cell>
            </Section>
            <TonConnectButton className="ton-connect-page__button-connected" />
          </>
        )}
        <DisplayData
          header="Account"
          rows={[
            { title: 'Address', value: address },
            { title: 'Chain', value: chain },
            { title: 'Public Key', value: publicKey },
            { title: 'User Friendly Address', value: userFriendlyAddress },
          ]}
        />

        <DisplayData
          header="Events"
          rows={events.map((event) => ({
            title: event.actions[0].simplePreview.description,
            value: event.actions[0].simplePreview.value,
          }))}
        />

        {/* <DisplayData
          header="NFTS"
          rows={nfts.map((nft) => ({
            title: nft.metadata.name,
            value: nft.metadata.description,
            // @ts-expect-error
            src: nft.previews[1].url,
          }))}
        /> */}

        <DisplayData
          header="Device"
          rows={[
            { title: 'App Name', value: appName },
            { title: 'App Version', value: appVersion },
            { title: 'Max Protocol Version', value: maxProtocolVersion },
            { title: 'Platform', value: platform },
            {
              title: 'Features',
              value: features
                .map((f) => (typeof f === 'object' ? f.name : undefined))
                .filter((v) => v)
                .join(', '),
            },
          ]}
        />
      </List>
    </Page>
  );
};

/* import { openLink } from '@telegram-apps/sdk-react';
import {
  Avatar,
  Cell,
  List,
  Navigation,
  Placeholder,
  Section,
  Text,
  Title,
} from '@telegram-apps/telegram-ui';
import { TonConnectButton, useTonAddress, useTonWallet } from '@tonconnect/ui-react';
import { useEffect, useState, type FC } from 'react';

import { DisplayData } from '@/components/DisplayData/DisplayData.tsx';
import { Page } from '@/components/Page.tsx';

import './TONConnectPage.css';

import ta from '@/api/tonapi';
import { NftItem } from '@ton-api/client';
import { Address } from '@ton/core';

// Use the API
async function fetchAccountEvents(userAddress: string) {
    const address = Address.parse(userAddress);
    const events = await ta.accounts.getAccountEvents(address, { limit: 50 })

    const nfts = await ta.accounts.getAccountNftItems(address, { limit: 50 })
    
    console.log('Events:', events);
    console.log('NFTs:', nfts);

    return nfts.nftItems;
}

export const TONConnectPage: FC = () => {
  const wallet = useTonWallet();
  const userFriendlyAddress = useTonAddress();
  const [events, setEvents]= useState<NftItem[]>([]);

  console.log(wallet);

  useEffect(() => {
    const handler = async () => {
      const event = await fetchAccountEvents(userFriendlyAddress);
      setEvents(event);
    }

    if (userFriendlyAddress) {
      handler();
    }
  }, [userFriendlyAddress])

  if (!wallet) {
    return (
      <Page>
        <Placeholder
          className="ton-connect-page__placeholder"
          header="TON Connect"
          description={
            <>
              <Text>
                To display the data related to the TON Connect, it is required to connect your
                wallet
              </Text>
              <TonConnectButton className="ton-connect-page__button"/>
            </>
          }
        />
      </Page>
    );
  }

  const {
    account: { chain, publicKey, address },
    device: {
      appName,
      appVersion,
      maxProtocolVersion,
      platform,
      features,
    },
  } = wallet;  

  return (
    <Page>
      <List>
        {'imageUrl' in wallet && (
          <>
            <Section>
              <Cell
                before={
                  <Avatar src={wallet.imageUrl} alt="Provider logo" width={60} height={60}/>
                }
                after={<Navigation>About wallet</Navigation>}
                subtitle={wallet.appName}
                onClick={(e) => {
                  e.preventDefault();
                  openLink(wallet.aboutUrl);
                }}
              >
                <Title level="3">{wallet.name}</Title>
              </Cell>
            </Section>
            <TonConnectButton className="ton-connect-page__button-connected"/>
          </>
        )}
        <DisplayData
          header="Account"
          rows={[
            { title: 'Address', value: address },
            { title: 'Chain', value: chain },
            { title: 'Public Key', value: publicKey },
            { title: 'User Friendly Address', value: userFriendlyAddress },
          ]}
        />

        <DisplayData
          header="NFTS"
          rows={events.map(( nft) => (
            { title: nft.metadata.name, value: nft.metadata.description, src: nft.previews[1].url }
          ))}
        />

        <DisplayData
          header="Device"
          rows={[
            { title: 'App Name', value: appName },
            { title: 'App Version', value: appVersion },
            { title: 'Max Protocol Version', value: maxProtocolVersion },
            { title: 'Platform', value: platform },
            {
              title: 'Features',
              value: features
                .map(f => typeof f === 'object' ? f.name : undefined)
                .filter(v => v)
                .join(', '),
            },
          ]}
        />

        
      </List>
    </Page>
  );
};
 */
