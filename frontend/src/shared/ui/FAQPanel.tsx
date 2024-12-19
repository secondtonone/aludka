import { type FC } from 'react';

import { HelpIcon } from '@/shared';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export const FAQPanel: FC = () => {
  const { t } = useTranslation();

  return (
    <Link to="/faq" className="px-4 py-2 rounded-3xl bg-transparent shadow border border-gray_aluminum justify-between items-center flex w-full">
      <div className="text-whity dark:text-white text-xs font-semibold">{t('How to join')}</div>
      <div className="text-whity dark:text-white"><HelpIcon /></div>
    </Link>
  );
};
