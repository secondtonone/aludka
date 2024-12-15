import { useEffect, useState, type FC } from 'react';

import { Page } from '@/app/layouts';
import {
  InsuranceList,
  InsuranceOptions,
  InsuranceOptionsProps,
} from '@/features';
import { FAQPanel } from '@/shared';
import { getInsurances } from '@/shared/api/getInsurances';
import { Button } from '@telegram-apps/telegram-ui';
import { useTranslation } from 'react-i18next';

const insurance = [
  {
    name: 'Euler Finance v2',
    description: 'Max 250k USDT',
    percent: '14 %',
    logo: '/euler-finance.png',
  },
  {
    name: 'Base DeFi Pass',
    description: 'Max 180k USDT',
    percent: '0.8 %',
    logo: '/base.png',
  },
  {
    name: 'Liquid Collective',
    description: 'Max 1.2M USDT',
    percent: '0.9 %',
    logo: '/liquidcollective.png',
  },
  {
    name: 'Sky Protocol',
    description: 'Max 20k USDT',
    percent: '1.3 %',
    logo: '/sky-money.png',
  },
  {
    name: 'Request Finance',
    description: 'Max 100k USDT',
    percent: '2.2 %',
    logo: '/request-finance.png',
  },
];

type Insurance = typeof insurance;

export const IndexPage: FC = () => {
  const [currentTab, setCurrentTab] =
    useState<InsuranceOptionsProps['currentTab']>('buy');
  const { t } = useTranslation();
  const [userInsurance, setUserInsurance] = useState<Insurance>(
    [] as Insurance
  );
  const [insurance, setInsurance] = useState<Insurance>([] as Insurance);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setError] = useState(false);

  const handler = async () => {
    setIsLoading(true);
    setError(false);
    try
    {
      const insurances = await getInsurances();

      setInsurance(insurances);
    } catch (error)
    {
      setError(true);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    handler();
  }, []);

  return (
    <Page>
      <FAQPanel />

      <InsuranceOptions currentTab={currentTab} setCurrentTab={setCurrentTab} />

      {currentTab === 'buy' ? (
        <InsuranceList
          content={insurance}
          isLoading={isLoading}
          isError={isError}
        />
      ) : (
        <InsuranceList
          content={userInsurance}
          onErrorComponent={() => (
            <Button
              onClick={handler}
              size="l"
              stretched
              className="!max-w-md !rounded-full !font-inter"
            >
              {t('Try again')}
            </Button>
          )}
          onEmptyComponent={() => (
            <Button
              onClick={() => setCurrentTab('buy')}
              size="l"
              stretched
              className="!max-w-md !rounded-full !font-inter"
            >
              {t('Select insurance')}
            </Button>
          )}
        />
      )}
    </Page>
  );
};
