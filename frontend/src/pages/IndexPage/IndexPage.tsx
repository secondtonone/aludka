import { useRive, useStateMachineInput } from '@rive-app/react-canvas';
import { useState, type FC } from 'react';

import { Page } from '@/app/layouts';
import { updateContract, useContract } from '@/entities/contracts';
import { LotteryCard } from '@/features';
import { FAQPanel, makeTransaction, timeUntilUTC } from '@/shared';
import { Timer } from '@/shared/ui/Timer';
import { Button, FixedLayout, Snackbar } from '@telegram-apps/telegram-ui';
import {
  useTonAddress,
  useTonConnectModal,
  useTonConnectUI,
} from '@tonconnect/ui-react';
import { useTranslation } from 'react-i18next';

export const IndexPage: FC = () => {
  const { t } = useTranslation();
  const [tonConnectUI] = useTonConnectUI();
  const { open: openTonConnectModal } = useTonConnectModal();
  const userFriendlyAddress = useTonAddress();
  const [isPending, setIsPending] = useState(false);
  const [isAcceptedShown, setSnackbarShown] = useState(false);
  const [isRejectedShown, setSnackbarRejectedShown] = useState(false);

  const { rive, RiveComponent } = useRive({
    src: '/confetti.riv',
    stateMachines: 'StateMachine',
    autoplay: true,
  });

  const startAnimation = useStateMachineInput(
    rive,
    'StateMachine',
    'Fire'
  );

  const timestamp = timeUntilUTC(0);

  const {
    data: contract = {
      id: '',
      prizePercentage: '50000',
      round: 1,
      commissionPercentage: '50000',
      entryFee: '0.503',
      totalPlayers: 1,
      totalAmount: '1.45',
      balance: '1.45',
    },
    isLoading,
  } = useContract();

  const handler = async () => {
    setIsPending(true);
    if (!userFriendlyAddress)
    {
      openTonConnectModal();
    } else
    {
      try
      {
        await makeTransaction({
          params: {
            price: totalPrice,
            comment: 'join',
          },
          provider: tonConnectUI,
        });

        setSnackbarShown(true);
        startAnimation?.fire();

        updateContract({
          totalPlayers: contract.totalPlayers + 1,
          balance: (parseFloat(contract.balance) + totalPrice).toString(),
        });
      } catch (error)
      {
        setSnackbarRejectedShown(true);
      }
    }
    setIsPending(false);
  };

  const totalPrice = parseFloat(contract.entryFee) + 0.003;
  const price =
    (parseFloat(contract.balance) * parseInt(contract.prizePercentage)) /
    100000;

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
      {isAcceptedShown && (
        <Snackbar
          description="Розыгрыш будет выполняться через указаное время"
          children="Вы учавствуете"
          onClose={() => setSnackbarShown(false)}
          duration={10000}
        />
      )}

      {isRejectedShown && (
        <Snackbar
          description="Что то случилось, попробуйте еще раз"
          children="Вы не учавствуете"
          onClose={() => setSnackbarRejectedShown(false)}
          duration={10000}
        />
      )}
      <RiveComponent className="absolute w-full h-full top-0 mt-[20%] right-0 left-0 pointer-events-none" />
      <FixedLayout
        vertical="bottom"
        style={{
          padding: 16,
        }}
        className="gap-4 items-center justify-center rounded-tl-2xl rounded-tr-2xl shadow flex flex-col bg-white dark:bg-black">
        <Timer timestamp={timestamp} onRestart={() => timeUntilUTC(0)} />
        <Button
          onClick={handler}
          loading={isPending}
          size="l"
          stretched
          className="!max-w-md !font-inter !rounded-3xl">
          {t('Join in')}
        </Button>
      </FixedLayout>
    </Page>
  );
};
