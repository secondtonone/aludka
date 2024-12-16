import { type FC } from 'react';

import { Page } from '@/app/layouts';
import { LotteryCard } from '@/features';
import { FAQPanel } from '@/shared';
import { Button, FixedLayout } from '@telegram-apps/telegram-ui';
import { useTranslation } from 'react-i18next';

export const IndexPage: FC = () => {
  const { t } = useTranslation();

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
        <div className="h-11 flex-col justify-center items-center gap-1 flex">
          <div className="text-center text-[#1e1e1e] dark:text-whity text-xl font-semibold font-['Inter'] leading-normal">
            2 часа 23 минуты
          </div>
          <div className="text-center text-[#646368] dark:text-whity text-xs font-normal font-['Inter'] leading-none">
            До конца раунда
          </div>
        </div>
        <Button
          onClick={() => { }}
          size="l"
          stretched
          className="!max-w-md !font-inter !rounded-3xl">
          {t('Join in')}
        </Button>
      </FixedLayout>
    </Page>
  );
};
