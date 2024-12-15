import { type FC } from 'react';

import { Avatar, Cell, FixedLayout, Placeholder, Skeleton, List as TgList } from '@telegram-apps/telegram-ui';
import { useTranslation } from 'react-i18next';

import s from './InsuranceList.module.css';

interface InsuranceListProps {
  content: {
    name: string,
    description: string,
    percent: string,
    logo: string
  }[]
  isError?: boolean
  isLoading?: boolean
  onErrorComponent?: () => React.ReactNode
  onEmptyComponent?: () => React.ReactNode
}

export const InsuranceList: FC<InsuranceListProps> = ({ content, isError, isLoading, onErrorComponent, onEmptyComponent }) => {
  const { t } = useTranslation();

  if (isLoading) return (
    <TgList>
      {Array.from({ length: 5 }).map((_, index) => (
        <Cell
          className={`${s.list} border-whity relative !mb-[10px] rounded-xl border bg-white !px-4 shadow dark:bg-black`}
          key={index}
          after={
            <div className="text-gray_dark dark:text-gray_light flex h-[14px] w-[24px] flex-col items-end overflow-hidden rounded-full mt-[26px] text-sm">
              <Skeleton visible className="min-h-[14px] w-full" />
            </div>
          }
          before={
            <div className="h-[48px] w-[48px] overflow-hidden rounded-full">
              <Skeleton visible className="h-full w-full" />
            </div>
          }
          description={
            <div className="h-[14px] w-[120px] overflow-hidden rounded-full">
              <Skeleton visible className="h-[14px] w-full" />
            </div>
          }
        >
          <div className="h-[18px] w-[200px] overflow-hidden rounded-full">
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
      description={t('Your insurance policies will be displayed here. Currently, there are none.')}
      header={t('No insurances')}
    >
      <img
        alt="Shield"
        src="/shield.svg"
      />
    </Placeholder>
    {onEmptyComponent ? <FixedLayout vertical="bottom" style={{
      padding: 16
    }} className="flex items-center justify-center">
      {onEmptyComponent()}
    </FixedLayout> : null}
  </div>)

  return (
    <TgList>
      {content.map(({ name, description, percent, logo }) => (
        <Cell
          className={`${s.list} bg-white dark:bg-black rounded-xl shadow border border-whity relative !px-4 !mb-[10px]`}
          after={<div className="pt-[26px] text-gray_dark dark:text-gray_light text-sm flex flex-col items-end">{percent}</div>}
          before={<Avatar size={48} src={logo} className="*:!rounded-none" />}
          description={description}
        >
          <span className="font-medium">{name}</span>
        </Cell>
      ))}
    </TgList>
  );
};
