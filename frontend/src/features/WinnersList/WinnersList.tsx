import { type FC } from 'react';

import { Cell, FixedLayout, Placeholder, Skeleton, List as TgList } from '@telegram-apps/telegram-ui';
import { useTranslation } from 'react-i18next';

import { ChevronIcon, formatCurrency } from '@/shared';
import { maskStringV2 } from 'maskdata';
import s from './WinnersList.module.css';

interface WinnersListProps {
  content: {
    amount: number,
    address: string,
    currency: string
  }[]
  isError?: boolean
  isLoading?: boolean
  onErrorComponent?: () => React.ReactNode
  onEmptyComponent?: () => React.ReactNode
  linkProvider: (address: string) => string
}

const maskCardOptions = {
  maskWith: '•',
  unmaskedStartCharacters: 10,
  unmaskedEndCharacters: 10,
  maxMaskedCharacters: 25,
};

export const WinnersList: FC<WinnersListProps> = ({ content, isError, isLoading, onErrorComponent, onEmptyComponent, linkProvider }) => {
  const { t } = useTranslation();

  if (isLoading) return (
    <TgList>
      {Array.from({ length: 5 }).map((_, index) => (
        <Cell
          className={`${s.list} border-whity relative !mb-[10px] rounded-xl border bg-white !px-4 shadow dark:bg-black`}
          key={index}
          description={
            <div className="h-[14px] w-[300px] overflow-hidden rounded-full">
              <Skeleton visible className="h-[14px] w-full" />
            </div>
          }
        >
          <div className="h-[18px] w-[50px] overflow-hidden rounded-full">
            <Skeleton visible className="h-full w-full" />
          </div>
        </Cell>
      ))}
    </TgList>
  );

  if (isError)
  {
    return (
      <div className="h-full flex flex-col items-center justify-center !font-inter">
        <Placeholder
          className="-translate-y-1/2 w-[300px]"
          description={t('Failed to load. Please try again.')}
          header={t('Error')}
        >
          <img
            alt="Error"
            src="/error.svg"
          />
        </Placeholder>
        {onErrorComponent ? <FixedLayout vertical="bottom" style={{
          padding: 16
        }} className="flex items-center justify-center">
          {onErrorComponent()}
        </FixedLayout> : null}
      </div>
    );
  }

  if (content.length === 0) return (<div className="h-full flex flex-col items-center justify-center !font-inter">
    <Placeholder
      className="-translate-y-1/2 w-[300px]"
      description={t('Be the first winner!')}
      header={t('There are no winners yet')}
    >
      <span className="text-6xl">🤷‍♂️</span>
    </Placeholder>
    {onEmptyComponent ? <FixedLayout vertical="bottom" style={{
      padding: 16
    }} className="flex items-center justify-center">
      {onEmptyComponent()}
    </FixedLayout> : null}
  </div>)

  return (
    <TgList>
      {content.map(({ amount, address, currency }) => (
        <a href={linkProvider(address)} target="_blank" rel="noopener" key={address + amount}>
          <Cell
            className={`${s.list} bg-white dark:bg-black rounded-xl shadow border border-whity relative !px-4 !mb-[10px]`}
            after={<div className="relative -top-[12px] text-gray_dark dark:text-gray_light text-sm flex flex-col items-end"> <ChevronIcon className="scale-1" /></div>}
            description={maskStringV2(address, maskCardOptions)}
          >
            <span className="font-medium text-blue">{`${formatCurrency(amount)} ${currency}`}</span>
          </Cell>
        </a>
      ))}
    </TgList>
  );
};
