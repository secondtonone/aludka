import { type FC } from 'react';

import { Page } from '@/app/layouts/Page';
import { Accordion, BackIcon, useHandleBack } from '@/shared';

import { isTMA } from '@telegram-apps/sdk-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { content } from './config';

export const FAQPage: FC = () => {
  const navigate = useNavigate();

  const t = useTranslation().t;

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
          <h1 className=" text-xl font-semibold leading-normal">{t('FAQ')}</h1>
        </div>
      )}

      <Accordion content={content} />
    </Page>
  );
};
