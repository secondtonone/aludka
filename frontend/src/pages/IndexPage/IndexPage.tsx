import { type FC } from 'react';

import { Page } from '@/app/layouts';
import { LotteryCard } from '@/features';
import { FAQPanel } from '@/shared';
import { Timer } from '@/shared/ui/Timer';
import { Button, FixedLayout } from '@telegram-apps/telegram-ui';
import { useTranslation } from 'react-i18next';

export const IndexPage: FC = () => {
  const { t } = useTranslation();

  const now = Date.now();
  const timestamp = now + 2 * 60 * 60 * 1000;

  return (
    <Page>
      <LotteryCard
        total={310}
        currency="TON"
        priced={150}
        price={25}
        round={2}
        totalPlayers={25}
        footer={<FAQPanel />}
      />

      <FixedLayout
        vertical="bottom"
        style={{
          padding: 16,
        }}
        className="gap-4 items-center justify-center rounded-tl-2xl rounded-tr-2xl shadow flex flex-col bg-white dark:bg-black">
        <Timer timestamp={timestamp} />
        <Button
          onClick={() => { }}
          size="l"
          stretched
          disabled={!(timestamp - now)}
          className="!max-w-md !font-inter !rounded-3xl">
          {t('Join in')}
        </Button>
      </FixedLayout>
    </Page>
  );
};
