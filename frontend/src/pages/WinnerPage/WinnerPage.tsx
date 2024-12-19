import { type FC } from 'react';

import { Page } from '@/app/layouts/Page';
import { BackIcon } from '@/shared';

import { WinnersList } from '@/features';
import { Button } from '@telegram-apps/telegram-ui';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const content = [
  {
    amount: 3,
    address: 'EQBpCjQrzr2SDPvOxFmqxibc2BlXD_bt4siGCKM6Qyhpd3OP',
    currency: 'TON',
  },
  {
    amount: 2000,
    address: 'EQBpCjQrzr2SDPvOxFmqxibc2BlXD_bt4siGCKM6Qyhpd3OP',
    currency: 'TON',
  },
  {
    amount: 100,
    address: 'EQBpCjQrzr2SDPvOxFmqxibc2BlXD_bt4siGCKM6Qyhpd3OP',
    currency: 'TON',
  },
  {
    amount: 3000.045,
    address: 'EQBpCjQrzr2SDPvOxFmqxibc2BlXD_bt4siGCKM6Qyhpd3OP',
    currency: 'TON',
  },
];

export const WinnerPage: FC = () => {
  const navigate = useNavigate();

  const t = useTranslation().t;

  return (
    <Page hideHeader>
      <div className="flex flex-col gap-3 text-black dark:text-white">
        <button
          type="button"
          className="justify-start items-center gap-1.5 inline-flex"
          onClick={() => navigate(-1)}>
          <BackIcon />
          <div className="text-center  text-sm font-semibold">{t('Back')}</div>
        </button>
        <h1 className=" text-xl font-semibold leading-normal">
          {t('Prizes sent to winners')}
        </h1>
      </div>

      <WinnersList
        content={content}
        linkProvider={(address) => `https://tonscan.org/ru/address/${address}`}
        onErrorComponent={() => (
          <Button
            onClick={() => window.location.reload()}
            size="l"
            stretched
            className="!rounded-full !font-inter !max-w-md">
            {t('Try again')}
          </Button>
        )}
        onEmptyComponent={() => (
          <Button
            onClick={() => navigate('/')}
            size="l"
            stretched
            className="!rounded-full !font-inter !max-w-md">
            {t('Join in')}
          </Button>
        )}
      />
    </Page>
  );
};
