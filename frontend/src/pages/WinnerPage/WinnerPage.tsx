import { type FC } from 'react';

import { Page } from '@/app/layouts/Page';
import { BackIcon, useHandleBack } from '@/shared';

import config from '@/config';
import { useWinners } from '@/entities/winners';
import { WinnersList } from '@/features';
import { isTMA } from '@telegram-apps/sdk-react';
import { Button } from '@telegram-apps/telegram-ui';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const providers = {
  tonviewer: 'tonviewer.com/transaction/',
  tonscan: 'tonscan.org/ru/tx/',
} as const;

export const WinnerPage: FC = () => {
  const navigate = useNavigate();

  const t = useTranslation().t;

  const { data: winners = [], isLoading } = useWinners();

  useHandleBack(() => {
    navigate(-1);
  }, true);

  return (
    <Page hideHeader>
      {isTMA('simple') ? null : (
        <div className="flex flex-col gap-3 text-black dark:text-white">
          <button
            type="button"
            className="justify-start items-center gap-1.5 inline-flex"
            onClick={() => navigate(-1)}>
            <BackIcon />
            <div className="text-center  text-sm font-semibold">
              {t('Back')}
            </div>
          </button>
          <h1 className=" text-xl font-semibold leading-normal">
            {t('Prizes sent to winners')}
          </h1>
        </div>
      )}

      <WinnersList
        isLoading={isLoading}
        content={winners}
        linkProvider={(address) =>
          `https://${config.isTestnet ? 'testnet.' : ''}${providers.tonviewer}${address}`
        }
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
