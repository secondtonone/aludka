import { type FC } from 'react';

import { SegmentedControl } from '@telegram-apps/telegram-ui';
import { SegmentedControlItem } from '@telegram-apps/telegram-ui/dist/components/Navigation/SegmentedControl/components/SegmentedControlItem/SegmentedControlItem';
import { useTranslation } from 'react-i18next';

import s from './InsuranceOptions.module.css';

const tabs = [
  {
    id: 'buy',
    title: 'Buy cover',
  },
  {
    id: 'my',
    title: 'My covers',
  },
] as const;

type Tab = typeof tabs[number]['id'];

export interface InsuranceOptionsProps {
  currentTab: Tab;
  setCurrentTab: (tab: Tab) => void;
}

export const InsuranceOptions: FC<InsuranceOptionsProps> = ({
  currentTab,
  setCurrentTab
}) => {
  const { t } = useTranslation();

  return (
    <SegmentedControl className={`${s.segmentControl} !rounded-md !p-1 !bg-gray_light dark:!bg-gray_dark !max-h-[42px]`
    }>
      {
        tabs.map(({ id, title }) => (
          <SegmentedControlItem
            className="*:!leading-none *:!text-sm *:!font-medium !py-1"
            onClick={() => setCurrentTab(id)}
            selected={currentTab === id}
            key={id}
          >
            {t(title)}
          </SegmentedControlItem>
        ))
      }
    </SegmentedControl >
  );
};
