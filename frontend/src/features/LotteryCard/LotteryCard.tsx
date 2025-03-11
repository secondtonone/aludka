import { ChevronIcon, getPlural } from '@/shared';
import { Skeleton } from '@telegram-apps/telegram-ui';
import { type FC } from 'react';

import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

interface LotteryCardProps {
  footer?: React.ReactNode;
  total: number;
  currency: string;
  totalPlayers: number;
  round: number;
  priced: number;
  price: number;
  isLoading?: boolean;
}

export const LotteryCard: FC<LotteryCardProps> = ({
  footer,
  total,
  currency,
  priced,
  price,
  round,
  totalPlayers,
  isLoading,
}) => {
  const { t } = useTranslation();

  return (
    <div className="p-5 bg-[#1e1e1e] rounded-2xl shadow flex-col justify-start items-center gap-4 flex">
      <div className="h-12 flex-col justify-start items-start gap-0.5 flex w-full">
        <div className="text-[#aaaaaa] text-sm font-normal leading-none">
          {t('Total in the pool')}
        </div>
        {isLoading ? (
          <div className="h-[30px] w-[150px] overflow-hidden rounded-full relative top-[15px]">
            <Skeleton
              visible
              className="h-[30px] w-full animate-ping"
            />
          </div>
        ) : (
          <div className="text-[#fbfbfb] text-3xl font-bold uppercase leading-loose tracking-tight">
            {total} {currency}
          </div>
        )}
      </div>

      {isLoading ? (
        <div className="h-[16px] w-[50px] overflow-hidden rounded-full self-start">
          <Skeleton
            visible
            className="h-[16px] w-full animate-ping"
          />
        </div>
      ) : (
        <Link
          to="/winners"
          className="text-[#f2e8fc] text-xs font-semibold leading-none text-left w-full flex flex-row items-center">
          <span>
            {priced} {currency} {t('drawn')}
          </span>{' '}
          <ChevronIcon />
        </Link>
      )}

      <div className="w-full h-32 flex-col justify-start items-start gap-2 flex">
        <div className="w-full h-16 pl-4 py-3 bg-white rounded-xl justify-between items-center flex flex-row">
          <div className="flex-col justify-start items-start inline-flex">
            {isLoading ? (
              <div className="h-[18px] w-[100px] overflow-hidden rounded-full self-start">
                <div
                  className="h-[18px] w-full bg-blacky animate-ping"
                />
              </div>
            ) : (
              <div className="text-[#0c2129] text-xl font-bold uppercase leading-normal tracking-tight flex flex-row">
                <div className="text-ellipsis max-w-40 overflow-hidden">{price}</div> {currency}
              </div>
            )}

            <div className="text-center text-[#646368] text-xs font-normal leading-tight">
              {t('The winner will receive')}
            </div>
          </div>

          <img
            className="w-24 h-14 mix-blend-hard-light"
            src="/cesar.png"
          />
        </div>

        <div className="gap-2 grid grid-cols-2 w-full">
          <div className="p-4 bg-gray_aluminum rounded-xl justify-start items-baseline gap-1 flex flex-row ">
            {isLoading ? (
              <div className="h-[18px] w-[100px] overflow-hidden rounded-full self-start">
                <Skeleton
                  visible
                  className="h-[18px] w-full *:!bg-blacky animate-ping"
                />
              </div>
            ) : (
              <>
                <span className="text-center text-[#fbfbfb] text-base font-semibold uppercase leading-tight tracking-tight ">
                  {totalPlayers}
                </span>{' '}
                <span className="text-center text-[#aaaaaa] text-xs font-normal leading-none">
                  {getPlural(totalPlayers, [
                    t('participant'),
                    t('participants-2'),
                    t('participants'),
                  ])}
                </span>
              </>
            )}
          </div>

          <div className="p-4 bg-gray_aluminum rounded-xl justify-start gap-1 flex items-baseline">
            {isLoading ? (
              <div className="h-[18px] w-[100px] overflow-hidden rounded-full self-start">
                <Skeleton
                  visible
                  className="h-[18px] w-full *:!bg-blacky animate-ping"
                />
              </div>
            ) : (
              <>
                <span className="text-center text-[#fbfbfb] text-base font-semibold uppercase leading-tight tracking-tight">
                  {round}
                </span>{' '}
                <span className="text-center text-[#aaaaaa] text-xs font-normal leading-none">
                  {t('round')}
                </span>
              </>
            )}
          </div>
        </div>
      </div>
      {footer}
    </div>
  );
};
