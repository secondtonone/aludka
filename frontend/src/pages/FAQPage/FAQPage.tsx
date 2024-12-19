import { type FC } from 'react';

import { Page } from '@/app/layouts/Page';
import { Accordion, BackIcon } from '@/shared';

import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';


const content = [
  {
    title: 'Euler Finance v2',
    text: 'Это текст ответа на вопрос. Он виден, только когда развернуть (нажать на вопрос).'
  },
  {
    title: 'Base DeFi Pass',
    text: 'Это текст ответа на вопрос. Он виден, только когда развернуть (нажать на вопрос).'
  },
  {
    title: 'Sky Protocol',
    text: 'Это текст ответа на вопрос. Он виден, только когда развернуть (нажать на вопрос).'
  },
  {
    title: 'Liquid Collective',
    text: 'Это текст ответа на вопрос. Он виден, только когда развернуть (нажать на вопрос). Можно развернуть сразу все вопросы'
  },
  {
    title: 'Request Finance',
    text: 'Это текст ответа на вопрос. Он виден, только когда развернуть (нажать на вопрос).'
  }
];


export const FAQPage: FC = () => {
  const navigate = useNavigate();

  const t = useTranslation().t;

  return (
    <Page hideHeader>
      <div className="flex flex-col gap-3 text-black dark:text-white">
        <button type="button" className="justify-start items-center gap-1.5 inline-flex" onClick={() => navigate(-1)}>
          <BackIcon />
          <div className="text-center  text-sm font-semibold">{t('Back')}</div>
        </button>
        <h1 className=" text-xl font-semibold leading-normal">{t('FAQ')}</h1>
      </div>

      <Accordion content={content} />

    </Page >
  );
};
