import { type FC } from 'react';

import { Page } from '@/app/layouts';
import { useContract } from '@/enteties/contracts';
import { LotteryCard } from '@/features';
import { FAQPanel, makeTransaction, timeUntilUTC } from '@/shared';
import { Timer } from '@/shared/ui/Timer';
import { Button, FixedLayout } from '@telegram-apps/telegram-ui';
import { useTonAddress, useTonConnectModal, useTonConnectUI } from '@tonconnect/ui-react';
import { useTranslation } from 'react-i18next';

export const IndexPage: FC = () => {
  const { t } = useTranslation();
  const [tonConnectUI] = useTonConnectUI();
  const { open: openTonConnectModal } = useTonConnectModal();
  const userFriendlyAddress = useTonAddress();

  const timestamp = timeUntilUTC(0);


  const {
    data: contract = {
      prizePercentage: '0.005',
      round: 1,
      commissionPercentage: '0.005',
      entryFee: '0.5',
      totalPlayers: 25,
      totalAmount: '1000.00',
      balance: '0'
    },
    isLoading
  } = useContract();

  const totalPrice = parseFloat(contract.entryFee) + 0.003;
  const price = parseFloat(contract.balance) * parseInt(contract.prizePercentage) / 100000;

  return (
    <Page>
      <LotteryCard
        total={parseFloat(contract.balance)}
        currency="TON"
        priced={parseFloat(contract.totalAmount)}
        price={price}
        round={contract.round}
        totalPlayers={contract.totalPlayers}
        footer={<FAQPanel />}
        isLoading={isLoading}
      />

      <FixedLayout
        vertical="bottom"
        style={{
          padding: 16,
        }}
        className="gap-4 items-center justify-center rounded-tl-2xl rounded-tr-2xl shadow flex flex-col bg-white dark:bg-black">
        <Timer timestamp={timestamp} />
        <Button
          onClick={async () => {
            if (!userFriendlyAddress)
            {
              openTonConnectModal();
            } else
            {
              try
              {
                await makeTransaction(
                  {
                    params: {
                      price: totalPrice,
                      comment: 'join',
                    },
                    provider: tonConnectUI,
                  }
                );

                console.log('Вы учавствуете в розыгрыше');
              } catch (error)
              {
                console.log(error);
              }
            }
          }}
          size="l"
          stretched
          className="!max-w-md !font-inter !rounded-3xl">
          {t('Join in')}
        </Button>
      </FixedLayout>
    </Page>
  );
};
