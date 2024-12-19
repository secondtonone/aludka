import { ChevronIcon, getPlural } from '@/shared';
import { type FC } from 'react';

import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

interface LotteryCardProps {
  footer?: React.ReactNode
  total: number
  currency: string
  totalPlayers: number
  round: number
  priced: number
  price: number
}

export const LotteryCard: FC<LotteryCardProps> = ({ footer, total, currency, priced, price, round, totalPlayers }) => {
  const { t } = useTranslation();

  return (
    <div className="p-5 bg-[#1e1e1e] rounded-2xl shadow flex-col justify-start items-center gap-4 flex">

      <div className="h-12 flex-col justify-start items-start gap-0.5 flex w-full">
        <div className="text-[#aaaaaa] text-sm font-normal leading-none">{t('Total in the pool')}</div>
        <div className="text-[#fbfbfb] text-3xl font-bold uppercase leading-loose tracking-tight">{total} {currency}</div>
      </div>

      <Link to="/winners" className="text-[#f2e8fc] text-xs font-semibold leading-none text-left w-full flex flex-row items-center"><span>{priced} {currency} разыграно</span> <ChevronIcon /></Link>

      <div className="w-full h-32 flex-col justify-start items-start gap-2 flex">

        <div className="w-full h-16 pl-4 py-3 bg-white rounded-xl justify-between items-center flex flex-row">

          <div className="flex-col justify-start items-start inline-flex">
            <div className="text-[#0c2129] text-xl font-bold uppercase leading-normal tracking-tight">{price} {currency}</div>

            <div className="text-center text-[#646368] text-xs font-normal leading-tight">Получит победитель</div>
          </div>

          <img className="w-24 h-14 mix-blend-hard-light" src="/cesar.png" />
        </div>

        <div className="gap-2 grid grid-cols-2 w-full">

          <div className="p-4 bg-gray_aluminum rounded-xl justify-start items-baseline gap-1 flex flex-row ">
            <span className="text-center text-[#fbfbfb] text-base font-semibold uppercase leading-tight tracking-tight ">{totalPlayers}</span>{' '}
            <span className="text-center text-[#aaaaaa] text-xs font-normal leading-none">{getPlural(totalPlayers, ['участник', 'участника', 'участников'])}</span>
          </div>

          <div className="p-4 bg-gray_aluminum rounded-xl justify-start gap-1 flex items-baseline">
            <span className="text-center text-[#fbfbfb] text-base font-semibold uppercase leading-tight tracking-tight">{round}</span>{' '}
            <span className="text-center text-[#aaaaaa] text-xs font-normal leading-none">раунд</span>
          </div>

        </div>
      </div>
      {footer}
    </div>

  );
};
